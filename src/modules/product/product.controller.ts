import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/common/interfaces/user';
import {
  CreateInventoryDto,
  UpdateInventoryDto,
} from './dto/create.inventories.dto';
import { CreateProductDto, UpdateProductDto } from './dto/create.product.dto';
import { InventoryService } from './inventory.service';
import { ProductService } from './product.service'; // Decorator untuk mendapatkan user dari request

@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(
    private productService: ProductService,
    private inventoryService: InventoryService,
  ) {}

  // Endpoint untuk membuat produk
  @Post()
  @UseGuards(AuthGuard) // Melindungi endpoint dengan AuthGuard
  async createProduct(
    @Body() create: CreateProductDto,
    @Req() request: AuthenticatedRequest,
  ) {
    // Menambahkan userId ke createDto
    return await this.productService.createProduct({
      ...create,
      userId: request.user.sub,
    });
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getProductByUser(@Req() request: AuthenticatedRequest) {
    return await this.productService.getProductByUser(request.user.sub);
  }
  @Get('notme')
  @UseGuards(AuthGuard)
  async getProductByUserNotme(
    @Req() request: AuthenticatedRequest,
    @Query('search') search?: string, // Mengubah dari string literal menjadi string
    @Query('category') category?: string,
    @Query('sortBy') sortBy?: 'price_asc' | 'price_desc' | 'newest',
    @Query('gender') gender?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('color') color?: string,
    @Query('size') size?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return await this.productService.getFilteredProducts(
      {
        search,
        gender,
        category,
        minPrice,
        sortBy,
        maxPrice,
        color,
        size,
        limit,
        offset,
      },
      request.user.sub,
    );
  }

  @Get('product/:id')
  @UseGuards(AuthGuard)
  async getProductById(@Param('id') productId: string) {
    return await this.productService.getProductById(productId);
  }

  // Endpoint untuk memperbarui produk
  @Put(':productId')
  @UseGuards(AuthGuard)
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateDto: UpdateProductDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return await this.productService.updateProduct(
      updateDto,
      productId,
      request.user.sub,
    );
  }

  // Endpoint untuk menghapus produk
  @Delete(':productId')
  @UseGuards(AuthGuard)
  async deleteProduct(
    @Param('productId') productId: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return await this.productService.delete(productId, request.user.sub);
  }

  // endpoint untuk crud inventory
  @Post(':productId/inventory')
  @UseGuards(AuthGuard)
  async createInventory(
    @Param('productId') productId: string,
    @Body() createInventoryDto: CreateInventoryDto,
  ) {
    // Set productId in DTO
    createInventoryDto.productId = productId;
    return await this.inventoryService.create(createInventoryDto);
  }

  @Get('search')
  @UseGuards(AuthGuard) // Tambahkan ini jika endpoint seharusnya dilindungi
  async searchProducts(
    @Query('search') search?: string, // Mengubah dari string literal menjadi string
    @Query('category') category?: string,
    @Query('sortBy') sortBy?: 'price_asc' | 'price_desc' | 'newest',
    @Query('gender') gender?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('color') color?: string,
    @Query('size') size?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    this.logger.log(
      `Searching products with params: ${JSON.stringify({
        search,
        category,
        minPrice,
        maxPrice,
        color,
        size,
        limit,
        offset,
      })}`,
      'searchProducts',
    );

    try {
      // Pastikan untuk menggunakan parameter `search` yang diterima
      const products = await this.productService.searchProducts({
        search,
        gender,
        category,
        minPrice,
        sortBy,
        maxPrice,
        color,
        size,
        limit,
        offset,
      });

      this.logger.log(
        `Search completed - found ${products} results`,
        'searchProducts',
      );
      console.log(products);
      return products;
    } catch (error) {
      this.logger.error(
        `Search failed: ${error.message}`,
        error.stack,
        'searchProducts',
      );
      throw error;
    }
  }
}
