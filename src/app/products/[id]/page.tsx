import { notFound } from "next/navigation";
import { ProductActions } from "@/components/product-actions";
import { SafeImage } from "@/components/safe-image";
import { fetchProductById } from "@/lib/api";
import { formatCurrency } from "@/lib/format";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    notFound();
  }

  const product = await fetchProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <section>
      <h1 className="page-title">{product.name}</h1>
      <div className="details">
        <SafeImage src={product.image} alt={product.name} className="details-image" />
        <div className="panel">
          <p className="price" style={{ fontSize: "1.4rem", marginTop: 0 }}>
            {formatCurrency(product.price)}
          </p>
          <p>{product.description}</p>
          <p className="muted">Category: {product.category ?? "N/A"}</p>
          <p className="muted">Brand: {product.brand ?? "N/A"}</p>
          <p className="muted">Rating: {product.rating ?? "N/A"}</p>
          <p className="muted">
            Availability: {product.availability ? "In stock" : "Out of stock"}
          </p>
          <div style={{ marginTop: "0.85rem" }}>
            <ProductActions productId={product.product_id} />
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 ? (
        <div className="panel" style={{ marginTop: "1rem" }}>
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-heading)" }}>Reviews</h2>
          <div className="list">
            {product.reviews.map((review, idx) => (
              <article key={`${review.user_id}-${idx}`}>
                <p style={{ margin: "0 0 0.3rem", fontWeight: 700 }}>
                  User #{review.user_id} • {review.rating}/5
                </p>
                <p className="muted" style={{ margin: 0 }}>
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
