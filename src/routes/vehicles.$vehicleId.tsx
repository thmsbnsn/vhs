import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { VehicleShell, OwnerShell } from "@/components/vhs/shells";
import { EmptyState, btn } from "@/components/vhs/ui";
import { getVehicle } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.vehicleId);
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  component: Layout,
  notFoundComponent: VehicleNotFound,
});

function Layout() {
  const { vehicle } = Route.useLoaderData();
  return <VehicleShell vehicle={vehicle} />;
}

function VehicleNotFound() {
  return (
    <OwnerShell>
      <EmptyState title="Vehicle not found" body="This vehicle isn't in your garage." action={<Link to="/garage" className={btn.primary}>Back to garage</Link>} />
    </OwnerShell>
  );
}
