import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <h1 aria-live="assertive">Error: {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </>
  );
}
