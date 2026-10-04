import { createFileRoute, Link } from "@tanstack/react-router";
import { OwnerShell } from "@/components/vhs/shells";
import { Card, Field, PageTitle, Section, btn, pageHead } from "@/components/vhs/ui";

export const Route = createFileRoute("/account")({
  head: () => pageHead("Account", "Manage your VHS account."),
  component: () => (
    <OwnerShell>
      <div className="mx-auto max-w-xl space-y-8">
        <PageTitle title="Account" />
        <Section title="Profile">
          <Card className="space-y-4">
            <Field label="Name" placeholder="Thomas Benson" />
            <Field label="Email" type="email" placeholder="thomas@example.com" />
            <button className={btn.primary}>Save</button>
          </Card>
        </Section>
        <Section title="Sign-in methods">
          <Card className="space-y-2 text-sm">
            <p className="flex justify-between"><span>Email & password</span><span className="text-muted-foreground">Enabled</span></p>
            <p className="flex justify-between"><span>Google</span><span className="text-muted-foreground">Not connected</span></p>
          </Card>
        </Section>
        <Link to="/" className={btn.secondary}>Sign out</Link>
      </div>
    </OwnerShell>
  ),
});
