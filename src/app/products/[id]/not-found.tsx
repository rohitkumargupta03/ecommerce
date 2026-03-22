import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="panel" style={{ marginTop: "1rem" }}>
      <h1 className="page-title" style={{ fontSize: "1.6rem" }}>
        Product not found
      </h1>
      <p className="muted">This product does not exist in the current catalog.</p>
      <Link href="/" className="button">
        Back to products
      </Link>
    </section>
  );
}
