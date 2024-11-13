import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

export function CardActivate() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+573</div>
        <p className="text-xs text-muted-foreground">Users currently active</p>
      </CardContent>
    </Card>
  );
}
