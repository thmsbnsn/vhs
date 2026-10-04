import { createFileRoute, Link } from "@tanstack/react-router";
import { UploadCloud } from "lucide-react";
import { Card, Field, PageTitle, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";

export const Route = createFileRoute("/vehicles/$vehicleId/documents/upload")({
  head: () => pageHead("Upload document", "Add a receipt, inspection or registration to the vehicle record."),
  component: UploadDoc,
});

function UploadDoc() {
  const v = useVehicle();
  return (
    <div className="max-w-xl">
      <PageTitle title="Upload document" sub="Photos or PDFs of receipts, inspections, registration." />
      <Card className="space-y-4">
        <label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-border-strong/50 bg-surface-2/40 p-8 text-center">
          <UploadCloud className="size-7 text-brand" />
          <span className="mt-2 text-sm font-semibold">Choose a file or take a photo</span>
          <span className="text-xs text-muted-foreground">PDF, JPG or PNG up to 20 MB</span>
          <input type="file" className="sr-only" />
        </label>
        <Field label="Title" placeholder="Oil change receipt" />
        <div className="grid grid-cols-2 gap-4"><Field label="Date" type="date" /><Field label="Mileage" mono placeholder="Optional" /></div>
        <div className="flex justify-end gap-2">
          <Link to="/vehicles/$vehicleId/documents" params={{ vehicleId: v.id }} className={btn.secondary}>Cancel</Link>
          <Link to="/vehicles/$vehicleId/documents" params={{ vehicleId: v.id }} className={btn.primary}>Save document</Link>
        </div>
      </Card>
    </div>
  );
}
