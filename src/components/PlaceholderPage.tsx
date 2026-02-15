/**
 * Job Notification Tracker — Placeholder Page Shell
 * Large serif heading + muted subtext.
 */

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="kn-placeholder-page">
      <h1 className="kn-placeholder-page__heading">{title}</h1>
      <p className="kn-placeholder-page__subtext">
        This section will be built in the next step.
      </p>
    </main>
  );
}
