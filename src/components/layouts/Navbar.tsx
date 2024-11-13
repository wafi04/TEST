import {
  Search,
  ShoppingBag,
  Bell,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";
import { useLogout } from "../../api/auth/auth.logout";
import { useGetCart } from "../../api/cart/cart.query";
import { useGetNotificationUser } from "../../api/notification/notification.query";
import { useProfile } from "../../hooks/auth/useProfile";
import { UserData } from "../../types/user";
import SearchInput from "../ui/search/SearchInput";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar({ user }: { user: UserData | null }) {
  const logout = useLogout();
  const { data: notificationData } = useGetNotificationUser();
  const { data: cartData } = useGetCart();

  const unreadNotifications =
    notificationData && notificationData.data.totalUnread;
  console.log(unreadNotifications);
  const cartItemCount = cartData?.items.length || 0;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {user && (
        <div className="bg-gray-50 py-2 px-4 md:px-10">
          <div className="max-w-7xl mx-auto flex justify-end items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </div>
            <span className="text-gray-300">|</span>
            <span>Welcome, {user.name}</span>
            <span className="text-gray-300">|</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout.mutate()}
              className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            className="text-3xl font-bebas md:text-4xl font-bold text-primary hover:text-primary/90 transition-colors">
            NextStore
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 items-center ">
            <a
              href="/dashboard"
              className="text-lg font-medium text-gray-700 hover:text-primary transition-colors">
              Dashboard
            </a>
            <a
              href="/p"
              className="text-lg font-medium text-gray-700 hover:text-primary transition-colors">
              Products
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <SearchInput />
            </div>

            {/* Cart */}
            <a
              href="/dashboard/cart"
              className="relative hover:text-primary transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </a>

            {/* Notifications */}
            <a
              href="/dashboard/notifications"
              className="relative hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
              {(unreadNotifications as number) > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </a>

            {/* User Profile Dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full p-0 hover:bg-transparent">
                    <Avatar>
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/dashboard/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout.mutate()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
