import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';
import { AuthenticatedRequest } from 'src/common/interfaces/user';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  DataUpdate,
  ExtendedCartItem,
} from 'src/common/interfaces/cart.interfaces';

@Controller('cart')
@UseGuards(AuthGuard) // Sesuaikan dengan strategi auth Anda
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async GetCart(@Req() req: AuthenticatedRequest) {
    return this.cartService.getUserCart(req.user.sub);
  }

  @Post('add')
  async AddToCart(
    @Req() req: AuthenticatedRequest,
    @Body() create: CreateCartDto,
  ): Promise<ExtendedCartItem> {
    return this.cartService.addToCart({
      productId: create.productId,
      quantity: create.quantity,
      size: create.size,
      userId: req.user.sub,
    });
  }
  @Delete('cartItem/:id')
  async DeleteFormCartItem(@Param('id') id: string) {
    const cartItemId = parseInt(id);
    return this.cartService.removeFromCart(cartItemId);
  }
  @Put('cartItem/:id')
  async Update(@Param('id') id: string, @Body() data: DataUpdate) {
    const cartItemId = parseInt(id);
    return this.cartService.updateQuantity({
      cartItemId,
      price: data.price,
      quantity: data.quantity,
    });
  }
  @Get('checkout')
  async GetCheckout(@Req() req: AuthenticatedRequest) {
    return this.cartService.getCheckoutItemsByUser(req.user.sub);
  }
  @Delete('clear')
  async clearCart(@Req() req: AuthenticatedRequest) {
    return this.cartService.clearCart(req.user.sub);
  }
  @Put('checkout')
  async CheckoutCart(@Req() req: AuthenticatedRequest) {
    return this.cartService.checkoutCart(req.user.sub);
  }
}
