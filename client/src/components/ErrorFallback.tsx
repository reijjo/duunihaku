import type { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorDetails = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    // For Apollo errors
    graphQLErrors: error.graphQLErrors,
    networkError: error.networkError,
    // Additional properties that might be present
    cause: error.cause,
    code: error.code,
    statusCode: error.statusCode,
  };

  console.log("Full error details:", errorDetails);

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        padding: "1rem",
        gap: "0.5rem",
      }}
    >
      <p>Oooops...</p>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
