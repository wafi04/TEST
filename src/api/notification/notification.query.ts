import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification, NotificationResponse } from "../../types/notifications";
import { API_RESPONSE } from "../../types/types.utils";
import { NotificationClientService } from "./notification.crud";

const notificationService = new NotificationClientService();

// Hook untuk mendapatkan notifikasi pengguna
export function useGetNotificationUser(page = 1, limit = 10) {
  return useQuery<API_RESPONSE<NotificationResponse>>({
    queryKey: ["notifications", page, limit],
    queryFn: () => notificationService.getUserNotifications(page, limit),
    staleTime: 1000 * 60 * 5, // Data dianggap fresh selama 5 menit
  });
}

// Hook untuk menandai notifikasi sebagai dibaca
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationService.markNotificationAsRead(notificationId),
    onSuccess: () => {
      // Invalidate dan refetch notifikasi setelah berhasil
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.error("Gagal menandai notifikasi:", error);
    },
  });
}

// Hook untuk menandai semua notifikasi sebagai dibaca
export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllNotificationsAsRead(),
    onSuccess: () => {
      // Invalidate dan refetch notifikasi setelah berhasil
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.error("Gagal menandai semua notifikasi:", error);
    },
  });
}

// Hook untuk menghapus notifikasi
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationService.deleteNotification(notificationId),
    onSuccess: () => {
      // Invalidate dan refetch notifikasi setelah berhasil
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.error("Gagal menghapus notifikasi:", error);
    },
  });
}

// Hook untuk menghapus notifikasi yang sudah dibaca
export function useDeleteReadNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.deleteReadNotifications(),
    onSuccess: () => {
      // Invalidate dan refetch notifikasi setelah berhasil
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.error("Gagal menghapus notifikasi yang sudah dibaca:", error);
    },
  });
}
