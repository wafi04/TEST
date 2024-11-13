import { CardActivate } from "../../../components/ui/card/CardDashboard";
import { SalesCard } from "../../../components/ui/card/CardFreinds";
import { CardSubcription } from "../../../components/ui/card/CardSubscription";
import { RevenueSection } from "./RevenueSection";

export function ProductTop() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <RevenueSection />
      <SalesCard />
      <CardSubcription />
      <CardActivate />
    </div>
  );
}
