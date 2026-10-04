import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { Card, PageTitle, Section, StatusBadge, EmptyState, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { components, documents, fmtDate, fmtMi, STATUS_LABEL } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/health/$componentId")({
  head: () => pageHead("Component detail", "Status, provenance, evidence and history for one component."),
  component: Detail,
});

function Detail() {
  const v = useVehicle();
  const { componentId } = Route.useParams();
  const c = components.find((x) => x.vehicleId === v.id && x.id === componentId);
  if (!c) return <EmptyState title="Component not found" body="It may not be tracked for this vehicle." action={<Link to="/vehicles/$vehicleId/health" params={{ vehicleId: v.id }} className={btn.secondary}>Back to health</Link>} />;
  const evidence = documents.filter((d) => d.vehicleId === v.id).slice(0, c.source === "Receipt" || c.source === "Shop record" ? 1 : 0);
  return (
    <div className="space-y-6">
      <Link to="/vehicles/$vehicleId/health" params={{ vehicleId: v.id }} className={btn.ghost}>← Health</Link>
      <PageTitle title={c.name} sub={c.group} action={<StatusBadge status={c.status} />} />
      <Card>
        <p className="text-sm">{c.note}</p>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          {[["Status", STATUS_LABEL[c.status]], ["Source", c.source ?? "Not recorded"], ["Observed", fmtDate(c.observed)], ["Mileage", fmtMi(c.mileage)]].map(([k, val]) => (
            <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className={k === "Mileage" ? "font-mono" : "font-medium"}>{val}</dd></div>
          ))}
        </dl>
      </Card>
      <Section title="Evidence">
        {evidence.length ? evidence.map((d) => (
          <Link key={d.id} to="/vehicles/$vehicleId/documents" params={{ vehicleId: v.id }} className="card-surface flex items-center gap-3 p-3 text-sm"><FileText className="size-4 text-brand" />{d.title}<span className="ml-auto text-xs text-muted-foreground">{fmtDate(d.date)}</span></Link>
        )) : <EmptyState title="No evidence attached" body="Attach a receipt or inspection report to back up this status." />}
      </Section>
      <Section title="History">
        {c.history.length ? (
          <ol className="space-y-3 border-l border-border pl-4">
            {c.history.map((h, i) => (
              <li key={i}>
                <div className="flex items-center gap-2"><StatusBadge status={h.status} /><span className="text-xs text-muted-foreground">{fmtDate(h.date)} · <span className="font-mono">{fmtMi(h.mileage)}</span> · {h.source}</span></div>
                <p className="mt-1 text-sm">{h.note}</p>
              </li>
            ))}
          </ol>
        ) : <EmptyState title="No history yet" body="Updates to this component will appear here." />}
      </Section>
      <div className="flex gap-2">
        <Link to="/vehicles/$vehicleId/check" params={{ vehicleId: v.id }} className={btn.primary}>Update status</Link>
      </div>
    </div>
  );
}
