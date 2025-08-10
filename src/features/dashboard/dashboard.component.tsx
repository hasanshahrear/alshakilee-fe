import { Suspense } from "react";
import { UpcomingDeliveryOrderList } from "./upcoming-delivery-order-list";

export function Dashboard() {
  return (
    <Suspense>
      <UpcomingDeliveryOrderList />
    </Suspense>
  );
}
