import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

export function CardMockActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              title: "New Subscription",
              description: "John Doe purchased premium plan",
              time: "2 mins ago",
              badge: "New",
            },
            {
              title: "Payment Received",
              description: "$500 from Sarah Smith",
              time: "10 mins ago",
              badge: "Success",
            },
            {
              title: "System Update",
              description: "Version 2.0 deployed",
              time: "1 hour ago",
              badge: "Info",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3 last:border-b-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.title}</span>
                  <Badge>{activity.badge}</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
