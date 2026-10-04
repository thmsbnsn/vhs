import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { LogoMark, EmptyState } from "@/components/vhs/ui";
import { shares, getVehicle, fmtDate } from "@/lib/mock";

export const Route = createFileRoute("/share/$grantToken")({
  loader: ({ params }) => {
    const share = shares.find((s) => s.token === params.grantToken);
    const vehicle = share && getVehicle(share.vehicleId);
    if (!share || !vehicle) throw notFound();
    return { share, vehicle };
  },
  component: ShareLayout,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-8"><EmptyState title="Link expired or invalid" body="Ask the owner to send a new share link." /></div>
  ),
});

function ShareLayout() {
  const { share, vehicle } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2"><LogoMark className="h-6 w-7" /><span className="font-bold">VHS</span><span className="text-sm text-muted-foreground">· {vehicle.nickname}</span></div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-text-2"><Eye className="size-3.5" />Read-only</span>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-2 text-xs text-muted-foreground">Shared with {share.recipient} · expires {fmtDate(share.expires)}</div>
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-4"><Outlet /></main>
    </div>
  );
}
