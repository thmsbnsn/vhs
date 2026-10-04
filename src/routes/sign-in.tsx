import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/vhs/shells";
import { Field, btn, pageHead } from "@/components/vhs/ui";
import { GoogleButton } from "@/components/vhs/google";

export const Route = createFileRoute("/sign-in")({
  head: () => pageHead("Sign in", "Sign in to your VHS vehicle health record."),
  component: () => (
    <AuthShell>
      <h1 className="text-xl font-bold">Sign in</h1>
      <p className="mt-1 text-sm text-text-2">Welcome back to your garage.</p>
      <div className="mt-6 space-y-4">
        <GoogleButton />
        <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Field label="Password" type="password" />
        <div className="text-right"><Link to="/forgot-password" className={btn.ghost}>Forgot password?</Link></div>
        <Link to="/garage" className={btn.primary + " w-full"}>Sign in</Link>
      </div>
      <p className="mt-6 text-center text-sm text-text-2">New to VHS? <Link to="/create-account" className={btn.ghost}>Create account</Link></p>
    </AuthShell>
  ),
});
