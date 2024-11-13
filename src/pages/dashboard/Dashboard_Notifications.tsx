import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ShoppingCart,
  Package,
  Check,
  Trash2,
  MoreVerticalIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Badge } from "../../components/ui/badge";
import { NotificationType } from "../../types/notifications";
import {
  useDeleteNotification,
  useDeleteReadNotifications,
  useGetNotificationUser,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
} from "../../api/notification/notification.query";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "STOCK_LOW":
      return <Package className="w-5 h-5 text-yellow-500" />;
    case "CART_ITEM_UPDATED":
      return <ShoppingCart className="w-5 h-5 text-blue-500" />;
    case "PAYMENT_SUCCESS":
      return <Bell className="w-5 h-5 text-green-500" />;
    default:
      return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

export function DashboardNotifications() {
  const { data: notificationData } = useGetNotificationUser();
  const notifications = notificationData?.data?.notifications || [];
  const updateAll = useMarkAllNotificationsAsRead();
  const updateNotif = useMarkNotificationAsRead();
  const deleteNotifRead = useDeleteReadNotifications();
  const deleteNotif = useDeleteNotification();

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const handleMarkAllAsRead = () => {
    if (unreadCount > 0) {
      updateAll.mutate();
    }
  };

  const handleMarkAsRead = (id: string) => {
    updateNotif.mutate(id);
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotif.mutate(id);
  };

  const handleDeleteReadNotifications = () => {
    const hasReadNotifications = notifications.some((notif) => notif.isRead);
    if (hasReadNotifications) {
      deleteNotifRead.mutate();
    }
  };

  return (
    <div className="bg-white mt-10 rounded-lg shadow-sm border mx-auto">
      <div className="px-6 py-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-slate-600" />
          <h2 className="font-medium text-slate-800">Notifications</h2>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge className="bg-blue-500 hover:bg-blue-600">
              {unreadCount} unread
            </Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}>
                <Check className="mr-2 h-4 w-4" />
                Mark all as read
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDeleteReadNotifications}
                disabled={!notifications.some((n) => n.isRead)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete read notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea className="h-[60vh]">
        <AnimatePresence>
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`px-6 py-4 hover:bg-slate-50 transition-all relative group ${
                    !notification.isRead ? "bg-slate-50/80" : ""
                  }`}>
                  <div className="flex gap-4">
                    <div className="mt-1 bg-white p-2 rounded-full shadow-sm border">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-400">
                        {notification.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleMarkAsRead(notification.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                        onClick={() =>
                          handleDeleteNotification(notification.id)
                        }>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {!notification.isRead && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute right-6 top-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 text-slate-500">
              <Bell className="w-12 h-12 text-slate-300 mb-3" />
              <p>No notifications yet</p>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}

export default DashboardNotifications;
