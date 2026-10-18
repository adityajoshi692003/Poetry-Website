export default function ErrorState({ message = 'Something went wrong while loading the archive.' }) {
  return (
    <div className="error-state" role="alert">
      <h3>Archive unavailable</h3>
      <p>{message}</p>
    </div>
  );
}
