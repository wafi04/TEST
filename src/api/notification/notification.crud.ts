import { BASE_URL } from "../../constant";

export class NotificationClientService {
  private readonly baseUrl = `${BASE_URL}/notifications`;

  // Mendapatkan notifikasi pengguna
  async getUserNotifications(page: number = 1, limit: number = 10) {
    try {
      const response = await fetch(
        `${this.baseUrl}?page=${page}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include", // Untuk mengirim cookies (autentikasi)
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengambil notifikasi");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  // Menandai satu notifikasi sebagai dibaca
  async markNotificationAsRead(notificationId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/mark/${notificationId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menandai notifikasi");
      }

      return await response.json();
    } catch (error) {
      console.error("Error marking notification:", error);
      throw error;
    }
  }

  // Menandai semua notifikasi sebagai dibaca
  async markAllNotificationsAsRead() {
    try {
      const response = await fetch(`${this.baseUrl}/mark-all`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menandai semua notifikasi");
      }

      return await response.json();
    } catch (error) {
      console.error("Error marking all notifications:", error);
      throw error;
    }
  }

  // Menghapus satu notifikasi
  async deleteNotification(notificationId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${notificationId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus notifikasi");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  }

  // Menghapus semua notifikasi yang sudah dibaca
  async deleteReadNotifications() {
    try {
      const response = await fetch(`${this.baseUrl}/read/all`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Gagal menghapus notifikasi yang sudah dibaca"
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting read notifications:", error);
      throw error;
    }
  }
}
