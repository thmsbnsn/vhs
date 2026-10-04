import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, EmptyState, btn, pageHead } from "@/components/vhs/ui";
import { events, fmtDate, fmtMi } from "@/lib/mock";

export const Route = createFileRoute("/share/$grantToken/records/$recordType/$recordId")({
  head: () => pageHead("Shared record", "A single read-only record from a shared vehicle history."),
  component: Record,
});

function Record() {
  const { grantToken, recordId } = Route.useParams();
  const e = events.find((x) => x.id === recordId);
  return (
    <div className="space-y-4">
      <Link to="/share/$grantToken" params={{ grantToken }} className={btn.ghost}>← Summary</Link>
      {!e ? <EmptyState title="Record not available" body="This record isn't included in the share." /> : (
        <Card>
          <p className="eyebrow">{e.kind}</p>
          <h1 className="text-xl font-bold">{e.title}</h1>
          <p className="mt-2 text-sm">{e.detail}</p>
          <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div><dt className="text-xs text-muted-foreground">Date</dt><dd>{fmtDate(e.date)}</dd></div>
            <div><dt className="text-xs text-muted-foreground">Mileage</dt><dd className="font-mono">{fmtMi(e.mileage)}</dd></div>
            <div><dt className="text-xs text-muted-foreground">Source</dt><dd>{e.source}</dd></div>
          </dl>
        </Card>
      )}
    </div>
  );
}
