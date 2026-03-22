"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="panel" style={{ marginTop: "1rem" }}>
      <h2 className="page-title" style={{ fontSize: "1.4rem" }}>
        Could not load data
      </h2>
      <p className="muted">
        There was a problem contacting the API. Please try again.
      </p>
      <button className="button" type="button" onClick={reset}>
        Retry
      </button>
    </section>
  );
}
