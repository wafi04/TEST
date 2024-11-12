import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { ParamsSearch, ProductData } from 'src/common/interfaces/product';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create.product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    private readonly prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createProduct(createDto: CreateProductDto) {
    try {
      const result = await this.prisma.$transaction(
        async (prisma) => {
          const user = await prisma.user.findFirst({
            where: { id: createDto.userId },
          });

          if (!user) {
            throw new BadRequestException('User  not found');
          }

          const product = await prisma.product.create({
            data: {
              category: createDto.category,
              color: createDto.color,
              image: createDto.image,
              name: createDto.name,
              sellerId: createDto.userId,
              price: createDto.price,
              gender: createDto.gender,
              description: createDto.description,
            },
          });

          if (createDto.Inventory && createDto.Inventory.length > 0) {
            await prisma.inventory.createMany({
              data: createDto.Inventory.map((inventory) => ({
                productId: product.id,
                size: inventory.size,
                quantity: inventory.quantity,
              })),
            });
          }

          return product;
        },
        {
          maxWait: 5000,
          timeout: 10000,
        },
      );

      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error creating product:', error);
      throw new BadRequestException('Failed to create product');
    }
  }

  async getProductByUser(userId: string) {
    const user = await this.authService.getProfile(userId);
    if (!user) {
      throw new BadRequestException('User  not found');
    }
    return await this.prisma.product.findMany({
      where: { sellerId: user.id },
      include: {
        Inventory: true,
        seller: true,
      },
    });
  }
  async getProductsNotOwnedByUser(userId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        sellerId: {
          not: userId, // Exclude products owned by the user
        },
      },
    });
    return products;
  }

  async getProductById(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        Inventory: true, // Ensure Inventory is included
        seller: true, // Ensure seller is included
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }
  async searchProducts(
    params: ParamsSearch,
  ): Promise<{ products: Product[]; totalCount: number }> {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      color,
      gender,
      size,
      limit = 10,
      offset = 0,
    } = params;
    console.log(params);
    // Validate price range values
    const validatedMinPrice =
      minPrice !== undefined && !isNaN(Number(minPrice))
        ? Number(minPrice)
        : null;
    const validatedMaxPrice =
      maxPrice !== undefined && !isNaN(Number(maxPrice))
        ? Number(maxPrice)
        : null;

    // Build where conditions
    const whereConditions: Prisma.ProductWhereInput = {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ],
      AND: [
        // Add category condition if provided
        gender ? { gender: gender } : {},
        category ? { category: category } : {},
        // Add price range conditions if provided
        minPrice !== undefined ? { price: { gte: validatedMinPrice } } : {},
        maxPrice !== undefined ? { price: { lte: validatedMaxPrice } } : {},
        // Add color condition if provided
        color ? { color: { contains: color } } : {},
        // Add size condition if provided
        size
          ? {
              Inventory: {
                some: { size: size },
              },
            }
          : {},
      ],
    };

    this.logger.debug(`Where conditions: ${JSON.stringify(whereConditions)}`);
    // Execute search query and count in parallel
    const [products, totalCount] = await Promise.all([
      this.prisma.product.findMany({
        where: whereConditions,
        include: {
          Inventory: true,
          seller: true,
        },
        take: Number(limit),
        skip: Number(offset),
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.product.count({
        where: whereConditions,
      }),
    ]);
    this.logger.log(`Found ${products.length} products`);
    console.log('Products:', products);

    return { products, totalCount };
  }
  async updateProduct(
    updateProductDto: UpdateProductDto,
    productId: string,
    userId: string,
  ) {
    const { Inventory, ...productData } = updateProductDto;

    // Persiapkan input untuk inventori
    const inventoryInput: Prisma.InventoryUpdateManyWithoutProductNestedInput =
      Inventory
        ? {
            // Hapus inventori yang ada
            deleteMany: {},
            // Buat inventori baru
            create: Inventory.map((inv) => ({
              size: inv.size,
              quantity: inv.quantity,
            })),
          }
        : {};

    return this.prisma.product.update({
      where: { id: productId },
      data: {
        ...productData,
        Inventory: inventoryInput,
      },
      include: {
        Inventory: true,
      },
    });
  }

  async delete(productId: string, userId: string) {
    try {
      // Gunakan transaction untuk memastikan semua operasi berhasil atau gagal bersama
      const result = await this.prisma.$transaction(
        async (prisma) => {
          // Pertama, periksa apakah produk ada
          const product = await prisma.product.findUnique({
            where: {
              id: productId,
              sellerId: userId, // Tambahkan validasi pemilik
            },
            include: { Inventory: true },
          });

          // Jika produk tidak ditemukan, lempar error
          if (!product) {
            throw new BadRequestException('Product not found');
          }

          // Hapus terlebih dahulu inventaris terkait
          await prisma.inventory.deleteMany({
            where: { productId: productId },
          });

          // Kemudian hapus produk
          const deletedProduct = await prisma.product.delete({
            where: { id: productId },
            include: {
              Inventory: true, // Tetap sertakan inventaris untuk konfirmasi
              seller: true, // Opsional: sertakan informasi penjual jika diperlukan
            },
          });

          return deletedProduct;
        },
        {
          // Konfigurasi tambahan untuk transaction
          maxWait: 5000, // Waktu maksimal untuk tunggu transaksi
          timeout: 10000, // Timeout total transaksi
        },
      );

      return result;
    } catch (error) {
      // Tangani error yang mungkin terjadi
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Log error untuk debugging
      console.error('Error deleting product:', error);

      // Throw error umum
      throw new BadRequestException('Failed to delete product');
    }
  }
}
