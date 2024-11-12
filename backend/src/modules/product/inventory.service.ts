import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto } from './dto/create.inventories.dto';
import { UpdateInventoryDto } from './dto/create.inventories.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProductAndSize(productId: string, size: string) {
    return await this.prisma.inventory.findFirst({
      where: {
        productId,
        size,
      },
    });
  }
  // Create a new inventory entry
  async create(createInventoryDto: CreateInventoryDto) {
    // Validate product exists
    if (createInventoryDto.productId) {
      const product = await this.prisma.product.findUnique({
        where: { id: createInventoryDto.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${createInventoryDto.productId} not found`,
        );
      }
    }

    return await this.prisma.inventory.create({
      data: {
        size: createInventoryDto.size,
        quantity: createInventoryDto.quantity,
        productId: createInventoryDto.productId,
      },
      include: {
        product: true,
      },
    });
  }

  // Get all inventory entries
  async findAll() {
    return await this.prisma.inventory.findMany({
      include: {
        product: true,
      },
    });
  }

  // Get a specific inventory entry by ID
  async findOne(id: number) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return inventory;
  }

  // Update an inventory entry
  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    // Validate inventory exists
    await this.findOne(id);

    // Validate product if provided
    if (updateInventoryDto.productId) {
      const product = await this.prisma.product.findUnique({
        where: { id: updateInventoryDto.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${updateInventoryDto.productId} not found`,
        );
      }
    }

    return await this.prisma.inventory.update({
      where: { id },
      data: {
        size: updateInventoryDto.size,
        quantity: updateInventoryDto.quantity,
      },
      include: {
        product: true,
      },
    });
  }

  // Delete an inventory entry
  async remove(id: number) {
    // Validate inventory exists
    await this.findOne(id);

    return await this.prisma.inventory.delete({
      where: { id },
    });
  }

  // Additional useful methods

  // Adjust inventory quantity
  async adjustQuantity(id: number, adjustment: number) {
    const inventory = await this.findOne(id);

    return await this.prisma.inventory.update({
      where: { id },
      data: {
        quantity: inventory.quantity + adjustment,
      },
      include: {
        product: true,
      },
    });
  }

  // Get inventory by product
  async getInventoryByProduct(productId: string) {
    return await this.prisma.inventory.findMany({
      where: { productId },
      include: {
        product: true,
      },
    });
  }

  // Search inventory with advanced filtering
  async searchInventory(query: {
    productId?: string;
    size?: string;
    minQuantity?: number;
  }) {
    return await this.prisma.inventory.findMany({
      where: {
        productId: query.productId,
        size: query.size,
        quantity: query.minQuantity ? { gte: query.minQuantity } : undefined,
      },
      include: {
        product: true,
      },
    });
  }
}
