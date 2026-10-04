import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageTitle, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";

export const Route = createFileRoute("/vehicles/$vehicleId/check")({
  head: () => pageHead("Quick check", "A short walk-around to update what you can see today."),
  component: Check,
});

const items = ["Tire tread & pressure", "Lights & signals", "Fluid leaks under car", "Wipers & washer fluid", "Warning lights on dash", "Brake feel"];

function Check() {
  const v = useVehicle();
  return (
    <div className="max-w-2xl">
      <PageTitle title="Quick check" sub="Takes about 5 minutes. Skip anything you can't check — it stays Unknown." />
      <Card className="divide-y divide-border p-0 sm:p-0">
        {items.map((i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <span className="text-sm font-medium">{i}</span>
            <div className="flex gap-1 text-xs">
              {["Looks good", "Not sure", "Problem"].map((o) => (
                <label key={o} className="cursor-pointer rounded-full border border-border px-3 py-1 has-checked:border-brand has-checked:bg-surface-2 has-checked:font-semibold">
                  <input type="radio" name={i} className="sr-only" />{o}
                </label>
              ))}
            </div>
          </div>
        ))}
      </Card>
      <div className="mt-4 flex justify-end"><Link to="/vehicles/$vehicleId" params={{ vehicleId: v.id }} className={btn.primary}>Save check</Link></div>
    </div>
  );
}
