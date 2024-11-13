export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string; // jika menggunakan Date object, gunakan Date type
  updatedAt: string | null;
}

export interface NotificationResponse {
  notifications: Notification[];
  total: number;
  totalUnread: number;
}

export enum NotificationType {
  CART_ITEM_ADDED = "CART_ITEM_ADDED",
  CART_ITEM_UPDATED = "CART_ITEM_UPDATED",
  PRODUCT_ADDED = "PRODUCT_ADDEDD",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  STOCK_LOW = "STOCK_LOW",
  GENERAL = "GENERAL",
}
