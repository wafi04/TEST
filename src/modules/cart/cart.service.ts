import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Cart, CartItem, Inventory, Prisma, Product } from '@prisma/client';
import { DataUpdate } from 'src/common/interfaces/cart.interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';

// Interface untuk Product dengan Inventory
interface ProductWithInventory extends Product {
  Inventory: Inventory[];
  availableQuantity: number;
  totalQuantity: number;
}

// Interface untuk CartItem dengan extended Product
interface ExtendedCartItem extends CartItem {
  product: ProductWithInventory;
}

// Interface untuk Cart dengan extended items
export interface ExtendedCart extends Cart {
  items: ExtendedCartItem[];
  totalPrice: number;
}

// Interface untuk raw cart data dari Prisma
interface RawCart extends Cart {
  items: (CartItem & {
    product: Product & {
      Inventory: Inventory[];
    };
  })[];
}

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // CREATE: Menambah item ke cart
  async addToCart(createCartDto: CreateCartDto): Promise<ExtendedCartItem> {
    const { productId, quantity, size, userId } = createCartDto;

    return this.prisma.$transaction(async (tx) => {
      // 1. Validasi product dan stock
      const inventory = await tx.inventory.findFirst({
        where: { productId, size },
      });

      const products = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!inventory || inventory.quantity < quantity) {
        throw new BadRequestException(
          `Stock tidak mencukupi. Tersedia: ${inventory?.quantity ?? 0}`,
        );
      }

      // 2.Cari atau buat cart
      let cart = await tx.cart.findFirst({
        where: { userId },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: {
            userId: userId,
            total: quantity * products.price,
            items: {
              create: [
                {
                  productId,
                  quantity,
                  size,
                  isCheckout: false,
                  total: quantity * products.price,
                },
              ],
            },
          },
        });
      }

      // 3. Cek item yang sudah ada
      const existingItem = await tx.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
          size,
          isCheckout: false,
        },
        include: {
          product: true,
        },
      });

      let cartItem: any;
      let isNewItem = false;

      if (existingItem) {
        // Update quantity jika item sudah ada
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > inventory.quantity) {
          throw new BadRequestException(
            `Total quantity melebihi stock. Maksimal: ${inventory.quantity}`,
          );
        }

        cartItem = await tx.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: newQuantity,
            total: products.price * newQuantity,
          },
          include: {
            product: true,
          },
        });
      } else {
        // Buat item baru
        cartItem = await tx.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
            size,
            isCheckout: false,
            total: quantity * products.price,
          },
          include: {
            product: true,
          },
        });
        isNewItem = true;
      }

      // 4. Buat Notifikasi untuk user
      await tx.notification.create({
        data: {
          userId: products.sellerId,
          type: isNewItem ? 'CART_ITEM_ADDED' : 'CART_ITEM_UPDATED',
          message: isNewItem
            ? `Produk ${products.name} (${size}) ditambahkan ke keranjang`
            : `Kuantitas produk ${products.name} (${size}) diperbarui menjadi ${cartItem.quantity}`,
          isRead: false,
        },
      });

      // 5. Buat notifikasi untuk seller jika stock menipis
      if (inventory.quantity <= 5) {
        await tx.notification.create({
          data: {
            userId: products.sellerId,
            type: 'STOCK_LOW',
            message: `Stock produk ${products.name} (${size}) hampir habis. Sisa: ${inventory.quantity}`,
            isRead: false,
          },
        });
      }

      // Transform response
      return {
        id: cartItem.id,
        cartId: cart.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        size: cartItem.size,
        isCheckout: cartItem.isCheckout,
        createdAt: cartItem.createdAt,
        updatedAt: cartItem.updatedAt,
        total: cartItem.total,
        product: {
          ...cartItem.product,
          availableQuantity: inventory.quantity,
        },
      };
    });
  }

  getCheckoutItemsByUser = async (userId: string) => {
    return await this.prisma.cartItem.findMany({
      where: {
        cart: {
          userId: userId,
        },
        isCheckout: true,
      },
      select: {
        id: true,
        quantity: true,
        total: true,
        size: true,
        product: {
          select: {
            name: true,
            price: true,
            image: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Urutkan dari yang terbaru
      },
    });
  };
  // READ: Get user's cart
  async getUserCart(userId: string): Promise<ExtendedCart | null> {
    const rawCart = (await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          where: { isCheckout: false },
          include: {
            product: {
              include: {
                Inventory: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })) as RawCart | null;

    if (!rawCart) return null;

    const transformedCart: ExtendedCart = {
      id: rawCart.id,
      userId: rawCart.userId,
      total: rawCart.total,
      createdAt: rawCart.createdAt,
      items: rawCart.items.map((item) => {
        const inventory = item.product.Inventory;
        const availableQuantity =
          inventory.find((inv) => inv.size === item.size)?.quantity ?? 0;
        const totalQuantity = inventory.reduce(
          (sum, inv) => sum + inv.quantity,
          0,
        );

        return {
          ...item,
          product: {
            ...item.product,
            Inventory: inventory,
            availableQuantity,
            totalQuantity,
          },
        };
      }),
      totalPrice: rawCart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    };

    return transformedCart;
  }

  // DELETE: Remove item from cart
  async removeFromCart(cartItemId: number): Promise<void> {
    try {
      await this.prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    } catch (error) {
      throw new NotFoundException('Item tidak ditemukan di cart');
    }
  }
  async updateQuantity(update: DataUpdate) {
    const { cartItemId, price, quantity } = update;

    return await this.prisma.$transaction(
      async (prisma) => {
        // Find cart item within transaction
        const cartItem = await prisma.cartItem.findFirst({
          where: {
            id: cartItemId,
          },
        });

        if (!cartItem) {
          throw new NotFoundException('Item tidak ditemukan di cart');
        }

        // Find product within transaction
        const product = await prisma.product.findUnique({
          where: {
            id: cartItem.productId,
          },
        });

        if (!product) {
          throw new NotFoundException('Produk tidak ditemukan');
        }

        // Calculate new total
        const total = product.price * quantity;

        // Update cart item within transaction
        const updatedCartItem = await prisma.cartItem.update({
          where: {
            id: cartItem.id, // Pastikan cartItemId ada dan benar
          },
          data: {
            quantity: quantity, // Sekarang quantity akan terbaca dengan benar
            total: total,
          },
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        });

        // Update cart total
        if (cartItem.cartId) {
          const cart = await this.prisma.cart.findUnique({
            where: { id: cartItem.cartId },
          });
          if (cart) {
            await prisma.cart.update({
              where: {
                id: cartItem.cartId,
              },
              data: {
                total: {
                  increment: cart.total - updatedCartItem.total,
                },
              },
            });
          }
        }

        return updatedCartItem;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000,
        timeout: 10000,
      },
    );
  }

  // CLEAR: Empty the cart
  async clearCart(userId: string): Promise<void> {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart tidak ditemukan');
    }

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        isCheckout: false,
      },
    });
  }

  // Checkout cart
  async checkoutCart(userId: string): Promise<void> {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. Ambil keranjang pengguna
        const cart = await this.getUserCart(userId);

        if (!cart || cart.items.length === 0) {
          throw new BadRequestException('Cart kosong');
        }

        // 2. Ambil data pengguna untuk validasi saldo
        const user = await tx.user.findUnique({
          where: { id: userId },
        });

        // 3. Validasi saldo
        if (user.saldo < cart.total) {
          throw new BadRequestException('Saldo tidak mencukupi');
        }

        // 4. Validasi dan proses setiap item
        const lowStockNotifications: string[] = [];

        for (const item of cart.items) {
          // Cari inventory
          const inventory = await tx.inventory.findFirst({
            where: {
              productId: item.productId,
              size: item.size,
            },
            include: { product: true },
          });

          const product = await tx.product.findFirst({
            where: {
              id: inventory.productId,
            },
          });

          if (!product) {
            throw new BadRequestException(`Product Tidak ada `);
          }

          // Validasi stok
          if (!inventory || inventory.quantity < item.quantity) {
            throw new BadRequestException(
              `Stok untuk ${item.product.name} (${item.size}) tidak mencukupi`,
            );
          }

          // Update inventory
          const updatedInventory = await tx.inventory.update({
            where: { id: inventory.id },
            data: {
              quantity: inventory.quantity - item.quantity,
            },
          });

          // Cek stok rendah
          if (updatedInventory.quantity < 1) {
            lowStockNotifications.push(
              `Produk ${product.name} ukuran ${item.size} stok habis`,
            );
          } else if (updatedInventory.quantity < 5) {
            lowStockNotifications.push(
              `Produk ${product.name} ukuran ${item.size} stok rendah (${updatedInventory.quantity} tersisa)`,
            );
          }

          // Mark item as checked out
          await tx.cartItem.update({
            where: { id: item.id },
            data: { isCheckout: true },
          });
        }

        // 5. Kurangi saldo pengguna
        await tx.user.update({
          where: { id: userId },
          data: {
            saldo: user.saldo - cart.total,
          },
        });

        // 6. Buat notifikasi pembayaran berhasil
        await tx.notification.create({
          data: {
            userId,
            type: 'PAYMENT_SUCCESS',
            message: `Pembayaran berhasil. Total: Rp ${cart.total.toLocaleString()}`,
            isRead: false,
          },
        });

        // 7. Buat notifikasi stok rendah untuk penjual
        if (lowStockNotifications.length > 0) {
          const uniqueProducts = [
            ...new Set(cart.items.map((item) => item.productId)),
          ];

          const sellers = await tx.product.findMany({
            where: { id: { in: uniqueProducts } },
            include: {
              seller: true,
            },
          });

          for (const seller of sellers) {
            await tx.notification.create({
              data: {
                userId: seller.sellerId,
                type: 'STOCK_LOW',
                message: lowStockNotifications.join(', '),
                isRead: false,
              },
            });
          }
        }

        // Tidak perlu menghapus cart lagi
      },
      {
        maxWait: 5000,
        timeout: 10000,
      },
    );
  }
}

enum NotificationType {
  CART_ITEM_ADDED = 'CART_ITEM_ADDED',
  CART_ITEM_UPDATED = 'CART_ITEM_UPDATED',
  PRODUCT_ADDED = 'PRODUCT_ADDEDD',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  STOCK_LOW = 'STOCK_LOW',
  GENERAL = 'GENERAL',
}
