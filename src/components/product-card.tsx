import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency, shortDescription } from "@/lib/format";
import { SafeImage } from "@/components/safe-image";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article
      className="card"
      style={{ animationDelay: `${Math.min(index * 40, 260)}ms` }}
    >
      {product.discount ? (
        <p className="sale-badge">Save {product.discount}%</p>
      ) : null}
      <SafeImage src={product.image} alt={product.name} className="card-image" />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="muted" style={{ fontSize: "0.82rem", marginTop: "0.3rem" }}>
          {product.category ?? "General"}
        </p>
        <p className="price">{formatCurrency(product.price)}</p>
        <p className="muted">{shortDescription(product.description)}</p>
        <div className="row" style={{ marginTop: "0.75rem" }}>
          <Link className="button" href={`/products/${product.product_id}`}>
            View details
          </Link>
          <Link className="ghost-button" href="/wishlist">
            Wishlist
          </Link>
        </div>
      </div>
    </article>
  );
}
