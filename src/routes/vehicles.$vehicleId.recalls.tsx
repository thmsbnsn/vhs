import { createFileRoute } from "@tanstack/react-router";
import { PageTitle, StatusBadge, EmptyState, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { byVehicle, recalls, fmtDate } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/recalls")({
  head: () => pageHead("Recalls", "Manufacturer recalls for this VIN and whether they've been completed."),
  component: Recalls,
});

const tone = { open: "service", completed: "serviced", unknown: "unknown" } as const;

function Recalls() {
  const v = useVehicle();
  const list = byVehicle(recalls, v.id);
  return (
    <div>
      <PageTitle title="Recalls" sub={`Matched to VIN ${v.vin}. Completion status comes from your records.`} />
      {list.length === 0 ? <EmptyState title="No recalls found" body="None on record for this VIN." /> : (
        <div className="space-y-2">
          {list.map((r) => (
            <div key={r.id} className="card-surface p-4">
              <div className="flex items-center justify-between gap-3"><p className="font-semibold">{r.title}</p><StatusBadge status={tone[r.state]} /></div>
              <p className="mt-1 text-sm text-text-2">{r.summary}</p>
              <p className="mt-2 text-xs text-muted-foreground">Campaign <span className="font-mono">{r.campaign}</span> · Issued {fmtDate(r.issued)} · Manufacturer</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
