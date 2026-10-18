export default function Loading({ message = 'Loading the archive...' }) {
  return (
    <div className="loading-shell" aria-live="polite">
      <div className="loading-spinner" />
      <p>{message}</p>
    </div>
  );
}
