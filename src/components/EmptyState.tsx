/**
 * Job Notification Tracker — Premium Empty State
 * Calm, high whitespace. Clear next action.
 */

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="kn-empty-state">
      <h2 className="kn-empty-state__title">{title}</h2>
      <p className="kn-empty-state__message">{message}</p>
    </div>
  );
}
