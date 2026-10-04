import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/vhs/shells";
import { Field, btn, pageHead } from "@/components/vhs/ui";
import { GoogleButton } from "@/components/vhs/google";

export const Route = createFileRoute("/create-account")({
  head: () => pageHead("Create account", "Start a living health record for your vehicle."),
  component: () => (
    <AuthShell>
      <h1 className="text-xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-text-2">Start your vehicle's health record in a few minutes.</p>
      <div className="mt-6 space-y-4">
        <GoogleButton />
        <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Field label="Password" type="password" hint="At least 8 characters." />
        <Link to="/verify-email" className={btn.primary + " w-full"}>Create account</Link>
      </div>
      <p className="mt-6 text-center text-sm text-text-2">Already have one? <Link to="/sign-in" className={btn.ghost}>Sign in</Link></p>
    </AuthShell>
  ),
});
