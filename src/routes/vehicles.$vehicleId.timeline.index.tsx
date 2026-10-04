import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, Provenance, EmptyState, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { byVehicle, events } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/timeline/")({
  head: () => pageHead("Timeline", "Every service, symptom, check and document in order, with provenance."),
  component: Timeline,
});

function Timeline() {
  const v = useVehicle();
  const list = byVehicle(events, v.id);
  return (
    <div>
      <PageTitle title="Timeline" sub="The full history of this vehicle, newest first." />
      {list.length === 0 ? <EmptyState title="No events yet" body="Services, checks and symptoms you record show up here." /> : (
        <ol className="relative space-y-3 border-l-2 border-border pl-6">
          {list.map((e) => (
            <li key={e.id} className="relative">
              <span className="absolute -left-[31px] top-4 size-3 rounded-full border-2 border-brand bg-background" />
              <Link to="/vehicles/$vehicleId/timeline/$eventId" params={{ vehicleId: v.id, eventId: e.id }} className="card-surface block p-4 hover:border-border-strong">
                <p className="eyebrow">{e.kind}</p>
                <p className="font-semibold">{e.title}</p>
                <p className="mt-0.5 text-sm text-text-2">{e.detail}</p>
                <div className="mt-2"><Provenance source={e.source} date={e.date} mileage={e.mileage} /></div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
