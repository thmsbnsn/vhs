import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, btn, pageHead } from "@/components/vhs/ui";
import { VehicleSummary } from "@/components/vhs/summary";
import { useVehicle } from "@/lib/use-vehicle";

export const Route = createFileRoute("/vehicles/$vehicleId/summary")({
  head: () => pageHead("Summary", "A printable one-page summary of the vehicle health record."),
  component: Summary,
});

function Summary() {
  const v = useVehicle();
  return (
    <div>
      <PageTitle title="Vehicle summary" sub="What a mechanic or buyer would see." action={<button className={btn.secondary} onClick={() => window.print()}>Print</button>} />
      <VehicleSummary vehicle={v} />
    </div>
  );
}
