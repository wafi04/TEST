import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DataUpdate } from 'src/common/interfaces/cart.interfaces';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/cart.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CheckoutGateway implements OnModuleInit {
  private readonly logger = new Logger(CheckoutGateway.name);

  constructor(private readonly cartService: CartService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    console.log('WebSocket Gateway initialized');
    this.server.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);
    });
  }

  @SubscribeMessage('addToCart')
  async handleAddToCart(
    @MessageBody() data: CreateCartDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const result = await this.cartService.addToCart(data);
      this.server.emit('cartUpdated', result); // Broadcast pembaruan ke semua klien
    } catch (error) {
      console.error('Error adding to cart:', error);
      client.emit('error', {
        message: 'Failed to add item to cart',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
  @SubscribeMessage('updateQuantity')
  async handleUpdateQuantity(
    @MessageBody()
    data: DataUpdate,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      this.logger.log(data);
      const updatedItem = await this.cartService.updateQuantity({
        cartItemId: data.cartItemId,
        price: data.price,
        quantity: data.quantity,
      });

      // Broadcast ke semua client
      client.broadcast.emit('quantityUpdated', updatedItem);

      // Kirim respons ke client yang melakukan update
      return {
        event: 'quantityUpdated',
        data: updatedItem,
      };
    } catch (error) {
      // Kirim error ke client
      return {
        event: 'updateQuantityError',
        data: {
          message: error.message,
        },
      };
    }
  }
  @SubscribeMessage('getCart')
  async handleGetCart(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { userId } = data;
      const cart = await this.cartService.getUserCart(userId);
      client.emit('cartData', cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      client.emit('error', {
        message: 'Failed to fetch cart',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @SubscribeMessage('removeFromCart')
  async handleRemoveFromCart(
    @MessageBody() data: { cartItemId: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { cartItemId } = data;
      await this.cartService.removeFromCart(cartItemId);
      client.emit('cartItemRemoved', { cartItemId });
      client.broadcast.emit('cartItemRemoved', { cartItemId });
    } catch (error) {
      console.error('Error removing cart item:', error);
      client.emit('error', {
        message: 'Failed to remove cart item',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @SubscribeMessage('clearCart')
  async handleClearCart(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { userId } = data;
      await this.cartService.clearCart(userId);
      client.emit('cartCleared', { userId });
      client.broadcast.emit('cartCleared', { userId });
    } catch (error) {
      console.error('Error clearing cart:', error);
      client.emit('error', {
        message: 'Failed to clear cart',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @SubscribeMessage('checkout')
  async handleCheckout(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { userId } = data;
      await this.cartService.checkoutCart(userId);
      client.emit('checkoutSuccessful', { userId });
      client.broadcast.emit('checkoutSuccessful', { userId });
    } catch (error) {
      console.error('Error during checkout:', error);
      client.emit('error', {
        message: 'Checkout failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
