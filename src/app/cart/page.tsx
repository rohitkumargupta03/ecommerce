"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useShop } from "@/context/shop-context";
import { formatCurrency } from "@/lib/format";
import { useProducts } from "@/hooks/use-products";
import { SafeImage } from "@/components/safe-image";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useShop();
  const { data: products, loading, error } = useProducts();

  const cartProducts = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.product_id === item.productId);
          if (!product) {
            return null;
          }
          return { product, quantity: item.quantity };
        })
        .filter((entry): entry is { product: (typeof products)[number]; quantity: number } => Boolean(entry)),
    [cart, products],
  );

  const subtotal = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartProducts],
  );

  const total = subtotal;

  return (
    <section>
      <h1 className="page-title">Your Cart</h1>
      {loading ? <p className="muted">Loading cart...</p> : null}
      {error ? <p className="muted">{error}</p> : null}

      {!loading && cartProducts.length === 0 ? (
        <div className="panel" style={{ marginTop: "0.7rem" }}>
          <p className="muted">Your cart is empty.</p>
          <Link href="/" className="button">
            Start shopping
          </Link>
        </div>
      ) : null}

      <div className="list section-gap">
        {cartProducts.map(({ product, quantity }) => (
          <article key={product.product_id} className="list-item">
            <SafeImage src={product.image} alt={product.name} className="tiny-image" />
            <div className="list-copy">
              <p className="item-title">{product.name}</p>
              <p className="muted compact-text">
                {formatCurrency(product.price)}
              </p>
              <p className="muted compact-text">
                Subtotal: {formatCurrency(product.price * quantity)}
              </p>
            </div>
            <div className="row list-actions">
              <div className="qty" aria-label={`quantity-${product.product_id}`}>
                <button type="button" onClick={() => decreaseQty(product.product_id)}>
                  -
                </button>
                <span>{quantity}</span>
                <button type="button" onClick={() => increaseQty(product.product_id)}>
                  +
                </button>
              </div>
              <button
                type="button"
                className="danger-button"
                onClick={() => removeFromCart(product.product_id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      {cartProducts.length > 0 ? (
        <aside className="panel summary">
          <p className="compact-text">Subtotal: {formatCurrency(subtotal)}</p>
          <p className="summary-total">Total: {formatCurrency(total)}</p>
          <Link href="/checkout" className="button">
            Proceed to checkout
          </Link>
        </aside>
      ) : null}
    </section>
  );
}
