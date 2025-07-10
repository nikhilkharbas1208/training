import { useErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <div style={{ display: 'flex', gap: '10px' }}>
      <button onClick={resetBoundary}>Try again</button>
      </div>
    </div>
  );
}
export default ErrorFallback;