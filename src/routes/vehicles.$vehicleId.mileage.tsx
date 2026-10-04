import { createFileRoute } from "@tanstack/react-router";
import { Card, Field, PageTitle, Section, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { byVehicle, events, fmtDate, fmtMi } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/mileage")({
  head: () => pageHead("Mileage", "Log the odometer so maintenance estimates stay accurate."),
  component: Mileage,
});

function Mileage() {
  const v = useVehicle();
  const log = byVehicle(events, v.id).filter((e) => e.mileage != null);
  return (
    <div className="max-w-xl space-y-8">
      <PageTitle title="Update mileage" sub={`Last reading ${fmtMi(v.mileage)} on ${fmtDate(v.mileageDate)}.`} />
      <Card className="space-y-4">
        <Field label="Current odometer" mono placeholder={String(v.mileage)} />
        <button className={btn.primary}>Save reading</button>
      </Card>
      <Section title="Reading history">
        <Card className="divide-y divide-border p-0 sm:p-0">
          {log.map((e) => (
            <div key={e.id} className="flex justify-between px-4 py-2.5 text-sm"><span className="text-text-2">{fmtDate(e.date)} · {e.source}</span><span className="font-mono">{fmtMi(e.mileage)}</span></div>
          ))}
        </Card>
      </Section>
    </div>
  );
}
