import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Notification } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async markNotificationAsRead(
    notificationId: string,
    userId: string,
  ): Promise<void> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notifikasi tidak ditemukan');
    }

    // Pastikan notifikasi milik user yang bersangkutan
    if (notification.userId !== userId) {
      throw new ForbiddenException('Tidak dapat mengakses notifikasi ini');
    }

    await this.prisma.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
        updatedAt: new Date(),
      },
    });
  }

  // 2. Mark all notifications as read
  async markAllNotificationsAsRead(userId: string): Promise<void> {
    await this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
        updatedAt: new Date(),
      },
    });
  }

  // 3. Get user notifications with pagination
  async getUserNotifications(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    notifications: Notification[];
    totalUnread: number;
    total: number;
  }> {
    const skip = (page - 1) * limit;

    const [notifications, totalUnread, total] = await this.prisma.$transaction([
      // Get paginated notifications
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      // Get total unread count
      this.prisma.notification.count({
        where: {
          userId,
          isRead: false,
        },
      }),
      // Get total notifications
      this.prisma.notification.count({
        where: { userId },
      }),
    ]);

    return {
      notifications,
      totalUnread,
      total,
    };
  }

  // 4. Delete notification
  async deleteNotification(
    notificationId: string,
    userId: string,
  ): Promise<void> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notifikasi tidak ditemukan');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('Tidak dapat mengakses notifikasi ini');
    }

    await this.prisma.notification.delete({
      where: { id: notificationId },
    });
  }

  // 5. Delete all read notifications
  async deleteReadNotifications(userId: string): Promise<void> {
    await this.prisma.notification.deleteMany({
      where: {
        userId,
        isRead: true,
      },
    });
  }
}
