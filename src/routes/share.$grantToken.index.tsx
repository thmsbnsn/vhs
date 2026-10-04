import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { VehicleSummary } from "@/components/vhs/summary";
import { pageHead } from "@/components/vhs/ui";

const parent = getRouteApi("/share/$grantToken");

export const Route = createFileRoute("/share/$grantToken/")({
  head: () => pageHead("Shared vehicle record", "A read-only vehicle health summary shared by the owner."),
  component: ShareIndex,
});

function ShareIndex() {
  const { vehicle, share } = parent.useLoaderData();
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{vehicle.nickname}</h1>
      <VehicleSummary vehicle={vehicle} shareToken={share.token} />
    </>
  );
}
