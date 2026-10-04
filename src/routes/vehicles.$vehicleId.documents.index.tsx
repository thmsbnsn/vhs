import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Upload } from "lucide-react";
import { PageTitle, EmptyState, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { byVehicle, documents, fmtDate } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/documents/")({
  head: () => pageHead("Documents", "Receipts, inspections and paperwork for this vehicle."),
  component: Docs,
});

function Docs() {
  const v = useVehicle();
  const list = byVehicle(documents, v.id);
  const upload = <Link to="/vehicles/$vehicleId/documents/upload" params={{ vehicleId: v.id }} className={btn.primary}><Upload className="size-4" />Upload</Link>;
  return (
    <div>
      <PageTitle title="Documents" sub="Paperwork that backs up the record." action={upload} />
      {list.length === 0 ? <EmptyState title="No documents yet" body="Upload receipts and inspection reports to add evidence." action={upload} /> : (
        <div className="card-surface divide-y divide-border">
          {list.map((d) => (
            <div key={d.id} className="flex items-center gap-3 px-4 py-3">
              <span className="grid size-9 place-items-center rounded-lg bg-surface-2"><FileText className="size-4 text-brand" /></span>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{d.title}</p><p className="text-xs text-muted-foreground">{d.type} · {fmtDate(d.date)} · {d.size}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
