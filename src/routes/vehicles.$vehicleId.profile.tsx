import { createFileRoute } from "@tanstack/react-router";
import { Card, PageTitle, Section, btn, pageHead } from "@/components/vhs/ui";
import { MoreLinks } from "@/components/vhs/shells";
import { useVehicle } from "@/lib/use-vehicle";
import { fmtMi } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/profile")({
  head: () => pageHead("Vehicle profile", "Identity details for this vehicle: VIN, engine, plate."),
  component: Profile,
});

function Profile() {
  const v = useVehicle();
  const rows: [string, string, boolean?][] = [
    ["Nickname", v.nickname], ["Year", String(v.year)], ["Make", v.make], ["Model", v.model], ["Trim", v.trim],
    ["Engine", v.engine], ["VIN", v.vin, true], ["Plate", v.plate, true], ["Mileage", fmtMi(v.mileage), true],
  ];
  return (
    <div className="space-y-8">
      <PageTitle title="Vehicle profile" action={<button className={btn.secondary}>Edit</button>} />
      <Card>
        <dl className="grid gap-4 sm:grid-cols-3">
          {rows.map(([k, val, mono]) => (
            <div key={k}><dt className="text-xs text-muted-foreground">{k}</dt><dd className={mono ? "font-mono text-sm" : "text-sm font-medium"}>{val}</dd></div>
          ))}
        </dl>
      </Card>
      <Section title="More for this vehicle"><MoreLinks vehicleId={v.id} /></Section>
    </div>
  );
}
