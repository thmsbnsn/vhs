import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageTitle, EmptyState, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { events, fmtDate, fmtMi } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/timeline/$eventId")({
  head: () => pageHead("Timeline event", "Details and provenance for a vehicle history event."),
  component: EventDetail,
});

function EventDetail() {
  const v = useVehicle();
  const { eventId } = Route.useParams();
  const e = events.find((x) => x.id === eventId && x.vehicleId === v.id);
  if (!e) return <EmptyState title="Event not found" body="It may have been removed." />;
  return (
    <div className="space-y-6">
      <Link to="/vehicles/$vehicleId/timeline" params={{ vehicleId: v.id }} className={btn.ghost}>← Timeline</Link>
      <PageTitle title={e.title} sub={e.kind} />
      <Card>
        <p className="text-sm">{e.detail}</p>
        <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div><dt className="text-xs text-muted-foreground">Date</dt><dd className="font-medium">{fmtDate(e.date)}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Mileage</dt><dd className="font-mono">{fmtMi(e.mileage)}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Source</dt><dd className="font-medium">{e.source}</dd></div>
        </dl>
      </Card>
    </div>
  );
}
