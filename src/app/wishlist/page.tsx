"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useShop } from "@/context/shop-context";
import { formatCurrency } from "@/lib/format";
import { useProducts } from "@/hooks/use-products";
import { SafeImage } from "@/components/safe-image";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();
  const { data: products, loading, error } = useProducts();

  const wishProducts = useMemo(
    () => products.filter((product) => wishlist.includes(product.product_id)),
    [products, wishlist],
  );

  return (
    <section>
      <h1 className="page-title">Wishlist</h1>
      {loading ? <p className="muted">Loading wishlist...</p> : null}
      {error ? <p className="muted">{error}</p> : null}

      {!loading && wishProducts.length === 0 ? (
        <div className="panel" style={{ marginTop: "0.7rem" }}>
          <p className="muted">Your wishlist is empty.</p>
          <Link href="/" className="button">
            Explore products
          </Link>
        </div>
      ) : null}

      <div className="list section-gap">
        {wishProducts.map((product) => (
          <article key={product.product_id} className="list-item">
            <SafeImage src={product.image} alt={product.name} className="tiny-image" />
            <div className="list-copy">
              <p className="item-title">{product.name}</p>
              <p className="muted compact-text">
                {formatCurrency(product.price)}
              </p>
            </div>
            <div className="row list-actions">
              <button
                type="button"
                className="ghost-button"
                onClick={() => addToCart(product.product_id)}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="danger-button"
                onClick={() => removeFromWishlist(product.product_id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
