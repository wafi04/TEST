import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingOverlay } from "../ui/skeleton/LoadingOverlay";
import { LayoutProps } from "../../types/types.utils";
import { pageTransition, pageVariants } from "../../utils/layout.settings";
import { Navbar } from "./Navbar";
import { useAuth } from "../../hooks/auth/Auth-Provider";

// Utility function to determine if current route is an auth route
const isAuthRoute = (pathname: string) => {
  return pathname.startsWith("/auth");
};

export function MainLayout({
  children,
  className = "",
  requireAuth = true,
  title = "Aplikasi",
}: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const isAuthPage = isAuthRoute(location.pathname);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (isLoading) return;

    const handleNavigation = () => {
      if (requireAuth && !isAuthenticated) {
        // If we're not already on the login page
        if (!isAuthRoute(location.pathname)) {
          navigate("/auth/login", { replace: true });
        }
      } else if (isAuthPage && isAuthenticated) {
        navigate("/dashboard", { replace: true });
      }
    };

    handleNavigation();
  }, [
    isAuthenticated,
    isLoading,
    navigate,
    requireAuth,
    location.pathname,
    isAuthPage,
  ]);

  // Show loading state only during initial auth check
  if (isLoading && requireAuth) {
    return <LoadingOverlay />;
  }

  // Don't render protected content if user is not authenticated
  if (requireAuth && !isAuthenticated && !isLoading) {
    return null;
  }

  // Don't render auth pages if user is authenticated
  if (isAuthPage && isAuthenticated && !isLoading) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={`
          min-h-screen 
          overflow-hidden
          w-full 
          flex 
          flex-col
          bg-background 
          text-foreground 
          ${className}
        `}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Layout for protected pages
export function ProtectedLayout({
  children,
  ...props
}: Omit<LayoutProps, "requireAuth">) {
  const { user } = useAuth();

  return (
    <MainLayout requireAuth={true} {...props}>
      <Navbar user={user} />
      {children}
    </MainLayout>
  );
}

// Layout for auth pages (login, register, etc.)
export function AuthLayout({
  children,
  ...props
}: Omit<LayoutProps, "requireAuth">) {
  return (
    <MainLayout requireAuth={false} {...props}>
      {children}
    </MainLayout>
  );
}

// Layout for public pages
export function PublicLayout({
  children,
  ...props
}: Omit<LayoutProps, "requireAuth">) {
  const { user } = useAuth();
  return (
    <MainLayout requireAuth={false} {...props}>
      <Navbar user={user} />
      {children}
    </MainLayout>
  );
}
