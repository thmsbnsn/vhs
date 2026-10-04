import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/vhs/shells";
import { Field, btn, pageHead } from "@/components/vhs/ui";

export const Route = createFileRoute("/forgot-password")({
  head: () => pageHead("Forgot password", "Reset the password for your VHS account."),
  component: () => (
    <AuthShell>
      <h1 className="text-xl font-bold">Reset your password</h1>
      <p className="mt-1 text-sm text-text-2">Enter your email and we'll send a reset link.</p>
      <div className="mt-6 space-y-4">
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Link to="/reset-password" className={btn.primary + " w-full"}>Send reset link</Link>
      </div>
      <p className="mt-6 text-center text-sm"><Link to="/sign-in" className={btn.ghost}>Back to sign in</Link></p>
    </AuthShell>
  ),
});
