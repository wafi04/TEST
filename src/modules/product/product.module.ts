import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { CookieService } from 'src/auth/cookie.service';
import { InventoryService } from './inventory.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    AuthService,
    JwtService,
    CookieService,
    InventoryService,
  ],
})
export class ProductModule {}
