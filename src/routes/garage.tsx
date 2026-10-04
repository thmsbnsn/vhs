import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ChevronRight } from "lucide-react";
import { OwnerShell } from "@/components/vhs/shells";
import { PageTitle, btn, pageHead, StatusBadge } from "@/components/vhs/ui";
import { vehicles, components, fmtDate, fmtMi } from "@/lib/mock";

export const Route = createFileRoute("/garage")({
  head: () => pageHead("Garage", "All vehicles in your VHS garage."),
  component: Garage,
});

function Garage() {
  return (
    <OwnerShell>
      <PageTitle title="Your garage" sub="Every vehicle has its own living health record."
        action={<Link to="/vehicles/add" className={btn.primary}><Plus className="size-4" />Add vehicle</Link>} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => {
          const cs = components.filter((c) => c.vehicleId === v.id);
          const attention = cs.filter((c) => ["service", "issue"].includes(c.status)).length;
          const unknown = cs.filter((c) => c.status === "unknown").length;
          return (
            <Link key={v.id} to="/vehicles/$vehicleId" params={{ vehicleId: v.id }} className="card-surface group block p-5 transition hover:border-border-strong">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold">{v.nickname}</p>
                  <p className="text-sm text-text-2">{v.year} {v.make} {v.model} {v.trim}</p>
                </div>
                <ChevronRight className="size-5 text-muted-foreground transition group-hover:translate-x-0.5" />
              </div>
              <p className="mt-4 font-mono text-xl">{fmtMi(v.mileage)}</p>
              <p className="text-xs text-muted-foreground">Last updated {fmtDate(v.mileageDate)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {attention > 0 && <span className="text-xs"><StatusBadge status="service" /> <span className="ml-1 text-text-2">{attention}</span></span>}
                <span className="text-xs"><StatusBadge status="unknown" /> <span className="ml-1 text-text-2">{unknown}</span></span>
              </div>
            </Link>
          );
        })}
        <Link to="/vehicles/add" className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-border-strong/50 text-sm font-semibold text-text-2 hover:bg-surface-2/50">
          <Plus className="mb-1 size-5" />Add another vehicle
        </Link>
      </div>
    </OwnerShell>
  );
}
