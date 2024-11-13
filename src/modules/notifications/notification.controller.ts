import {
  Controller,
  Param,
  Patch,
  Delete,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthenticatedRequest } from 'src/common/interfaces/user';
import { NotificationService } from './notification.service';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Tandai satu notifikasi sebagai sudah dibaca
  @Patch('mark/:notificationId')
  async markNotification(
    @Param('notificationId') notificationId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    await this.notificationService.markNotificationAsRead(
      notificationId,
      req.user.sub,
    );
    return {
      success: true,
      message: 'Notifikasi berhasil ditandai sebagai sudah dibaca',
    };
  }

  // Tandai semua notifikasi sebagai sudah dibaca
  @Patch('mark-all')
  async markAllNotifications(@Req() req: AuthenticatedRequest) {
    await this.notificationService.markAllNotificationsAsRead(req.user.sub);
    return {
      success: true,
      message: 'Semua notifikasi berhasil ditandai sebagai sudah dibaca',
    };
  }

  // Dapatkan daftar notifikasi pengguna
  @Get()
  async getUserNotifications(
    @Req() req: AuthenticatedRequest,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pages = parseInt(page);
    const limits = parseInt(limit);
    return this.notificationService.getUserNotifications(
      req.user.sub,
      pages,
      limits,
    );
  }

  // Hapus satu notifikasi
  @Delete(':notificationId')
  async deleteNotification(
    @Param('notificationId') notificationId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    await this.notificationService.deleteNotification(
      notificationId,
      req.user.sub,
    );
    return {
      success: true,
      message: 'Notifikasi berhasil dihapus',
    };
  }

  // Hapus semua notifikasi yang sudah dibaca
  @Delete('read/all')
  async deleteReadNotifications(@Req() req: AuthenticatedRequest) {
    await this.notificationService.deleteReadNotifications(req.user.sub);
    return {
      success: true,
      message: 'Semua notifikasi yang sudah dibaca berhasil dihapus',
    };
  }
}
