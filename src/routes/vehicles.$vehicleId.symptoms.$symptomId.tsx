import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageTitle, StatusBadge, EmptyState, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { symptoms, fmtDate, fmtMi } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/symptoms/$symptomId")({
  head: () => pageHead("Symptom", "An owner-reported change, tracked over time."),
  component: SymptomPage,
});

function SymptomPage() {
  const v = useVehicle();
  const { symptomId } = Route.useParams();
  const s = symptoms.find((x) => x.id === symptomId && x.vehicleId === v.id);
  if (!s) return <EmptyState title="Symptom not found" body="It may have been resolved or removed." />;
  return (
    <div className="space-y-6">
      <Link to="/vehicles/$vehicleId" params={{ vehicleId: v.id }} className={btn.ghost}>← Dashboard</Link>
      <PageTitle title={s.title} sub="Owner observed" action={<StatusBadge status={s.status} />} />
      <Card className="space-y-4 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-xs text-muted-foreground">First noticed</p><p className="font-medium">{fmtDate(s.started)}</p></div>
          <div><p className="text-xs text-muted-foreground">Mileage</p><p className="font-mono">{fmtMi(s.mileage)}</p></div>
        </div>
        <div><p className="text-xs text-muted-foreground">When it happens</p><p>{s.when}</p></div>
        <div><p className="text-xs text-muted-foreground">Notes</p><p>{s.notes}</p></div>
      </Card>
      <p className="text-xs text-muted-foreground">VHS doesn't diagnose. Share this record with a mechanic for an expert opinion.</p>
      <div className="flex gap-2"><Link to="/vehicles/$vehicleId/shares" params={{ vehicleId: v.id }} className={btn.primary}>Share with a mechanic</Link><button className={btn.secondary}>Mark resolved</button></div>
    </div>
  );
}
