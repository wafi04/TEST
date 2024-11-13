import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { LoadingOverlay } from "../../components/ui/skeleton/LoadingOverlay";
import { useAuth } from "../../hooks/auth/Auth-Provider";
import { UserData } from "../../types/user";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { BadgeCheck, Edit, LogOut, Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export function DashboardProfile() {
  const { user, error, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="flex w-full justify-center items-center h-[60vh]">
      <Card className="w-full max-w-md   mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-0">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Avatar className="w-24 h-24 border-4 border-primary/50">
              <AvatarImage
                src={user?.image}
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl">
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {user?.name}
                </h2>
                <BadgeCheck className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground">{user?.email}</p>
              <Badge variant="secondary" className="mt-2">
                Active Member
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
