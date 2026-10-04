import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Field, PageTitle, TextArea, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";

export const Route = createFileRoute("/vehicles/$vehicleId/changes/new")({
  head: () => pageHead("Something changed", "Record a new noise, smell, feel or warning light."),
  component: NewChange,
});

function NewChange() {
  const v = useVehicle();
  return (
    <div className="max-w-xl">
      <PageTitle title="Something changed" sub="Describe what you noticed. VHS records it — it doesn't diagnose it." />
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm">
          {["Noise", "Smell", "Feel", "Warning light", "Leak", "Other"].map((t) => (
            <label key={t} className="cursor-pointer rounded-full border border-border px-3 py-1 has-checked:border-brand has-checked:bg-surface-2 has-checked:font-semibold">
              <input type="radio" name="kind" className="sr-only" />{t}
            </label>
          ))}
        </div>
        <Field label="Short title" placeholder="Grinding when braking" />
        <TextArea label="When does it happen?" placeholder="Only on cold mornings, first few stops…" />
        <div className="grid grid-cols-2 gap-4"><Field label="First noticed" type="date" /><Field label="Mileage" mono placeholder={String(v.mileage)} /></div>
        <div className="flex justify-end gap-2">
          <Link to="/vehicles/$vehicleId" params={{ vehicleId: v.id }} className={btn.secondary}>Cancel</Link>
          <Link to="/vehicles/$vehicleId/symptoms/$symptomId" params={{ vehicleId: v.id, symptomId: "ac-warm" }} className={btn.primary}>Save</Link>
        </div>
      </Card>
    </div>
  );
}
