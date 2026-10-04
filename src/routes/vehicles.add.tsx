import { createFileRoute, Link } from "@tanstack/react-router";
import { OwnerShell } from "@/components/vhs/shells";
import { Card, Field, PageTitle, btn, pageHead } from "@/components/vhs/ui";

export const Route = createFileRoute("/vehicles/add")({
  head: () => pageHead("Add vehicle", "Add a vehicle to your VHS garage."),
  component: () => (
    <OwnerShell>
      <div className="mx-auto max-w-xl">
        <PageTitle title="Add a vehicle" sub="Start with the basics. You can fill in history over time — anything missing will show as Unknown." />
        <Card className="space-y-4">
          <Field label="VIN" mono placeholder="17 characters" hint="We'll use it to look up year, make, model and recalls." />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Year" placeholder="2012" />
            <Field label="Make" placeholder="Honda" />
            <Field label="Model" placeholder="Civic" />
          </div>
          <Field label="Nickname" placeholder="The Civic" />
          <Field label="Current mileage" mono placeholder="148,320" />
          <div className="flex justify-end gap-2 pt-2">
            <Link to="/garage" className={btn.secondary}>Cancel</Link>
            <Link to="/vehicles/$vehicleId/baseline" params={{ vehicleId: "civic" }} className={btn.primary}>Add & start baseline</Link>
          </div>
        </Card>
      </div>
    </OwnerShell>
  ),
});
