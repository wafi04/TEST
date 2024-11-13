import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CheckoutGateway } from './cartGateaway';

@Module({
  controllers: [CartController],
  providers: [CartService, JwtService, CheckoutGateway],
})
export class CartModule {}
