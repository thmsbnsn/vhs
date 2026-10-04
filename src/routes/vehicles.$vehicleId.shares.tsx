import { createFileRoute, Link } from "@tanstack/react-router";
import { Link2 } from "lucide-react";
import { Card, PageTitle, EmptyState, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { shares, fmtDate } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/shares")({
  head: () => pageHead("Shares", "Give a mechanic temporary read-only access to this record."),
  component: Shares,
});

function Shares() {
  const v = useVehicle();
  const list = shares.filter((s) => s.vehicleId === v.id);
  return (
    <div className="space-y-6">
      <PageTitle title="Share with a mechanic" sub="Read-only links that expire. Mechanics don't need an account." action={<button className={btn.primary}><Link2 className="size-4" />New share link</button>} />
      {list.length === 0 ? <EmptyState title="No active shares" body="Create a link to send your record to a shop." /> : list.map((s) => (
        <Card key={s.token} className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{s.recipient}</p>
            <p className="text-xs text-muted-foreground">{s.scope} · Expires {fmtDate(s.expires)}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/share/$grantToken" params={{ grantToken: s.token }} className={btn.secondary}>Preview</Link>
            <button className={btn.secondary}>Revoke</button>
          </div>
        </Card>
      ))}
    </div>
  );
}
