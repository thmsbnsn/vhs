import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/vhs/shells";
import { Field, btn, pageHead } from "@/components/vhs/ui";

export const Route = createFileRoute("/reset-password")({
  head: () => pageHead("Set a new password", "Choose a new password for your VHS account."),
  component: () => (
    <AuthShell>
      <h1 className="text-xl font-bold">Set a new password</h1>
      <div className="mt-6 space-y-4">
        <Field label="New password" type="password" />
        <Field label="Confirm password" type="password" />
        <Link to="/sign-in" className={btn.primary + " w-full"}>Update password</Link>
      </div>
    </AuthShell>
  ),
});
