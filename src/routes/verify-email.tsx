import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { AuthShell } from "@/components/vhs/shells";
import { btn, pageHead } from "@/components/vhs/ui";

export const Route = createFileRoute("/verify-email")({
  head: () => pageHead("Verify your email", "Confirm your email address to open your VHS garage."),
  component: () => (
    <AuthShell>
      <MailCheck className="size-8 text-brand" />
      <h1 className="mt-3 text-xl font-bold">Check your inbox</h1>
      <p className="mt-2 text-sm text-text-2">We sent a confirmation link to your email. Open it to verify your account and get to your garage.</p>
      <div className="mt-6 flex flex-col gap-2">
        <Link to="/garage" className={btn.primary}>I've verified — continue</Link>
        <button className={btn.secondary}>Resend email</button>
      </div>
    </AuthShell>
  ),
});
