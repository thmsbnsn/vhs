import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, LogoMark, StatusBadge, btn, pageHead } from "@/components/vhs/ui";

export const Route = createFileRoute("/")({
  head: () => pageHead("Know your car", "VHS is a living vehicle health record: what's known, what needs attention, what's coming up, and what's still unknown."),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <Link to="/sign-in" className={btn.ghost}>Sign in</Link>
      </header>
      <main className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">Your vehicle health record</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Know your car.<br />Remember its history.<br /><span className="text-brand">Catch problems sooner.</span>
          </h1>
          <p className="mt-5 max-w-md text-text-2">
            One honest record of what's known, what needs attention, and what's coming up — with the source, date and mileage behind every entry. When we don't know, we say <em>Unknown</em>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/create-account" className={btn.primary}>Create account</Link>
            <Link to="/sign-in" className={btn.secondary}>Sign in</Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">No health scores. No AI diagnosis. Just your record.</p>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-border bg-surface-2" />
          <div className="absolute -right-1.5 -top-1.5 h-full w-full rounded-2xl border border-border bg-raised" />
          <div className="card-surface relative space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">The Civic</p>
                <p className="text-xs text-muted-foreground">2012 Honda Civic · <span className="font-mono">148,320 mi</span></p>
              </div>
              <LogoMark className="h-6 w-7" />
            </div>
            {[
              ["Front brake pads", "monitor", "Shop record · Jun 11"],
              ["Spark plugs", "service", "Past 105k mi interval"],
              ["Coolant", "unknown", "No history recorded"],
              ["Engine oil", "serviced", "Receipt · Jul 20"],
            ].map(([n, s, m]) => (
              <div key={n} className="flex items-center justify-between rounded-lg bg-surface-2/60 px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium">{n}</p>
                  <p className="text-xs text-muted-foreground">{m}</p>
                </div>
                <StatusBadge status={s as "monitor"} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
