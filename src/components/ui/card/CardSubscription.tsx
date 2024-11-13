import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

export function CardSubcription() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2350</div>
        <p className="text-xs text-green-500">+180.1% from last month</p>
      </CardContent>
    </Card>
  );
}
