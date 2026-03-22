"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useShop } from "@/context/shop-context";
import { formatCurrency } from "@/lib/format";
import { useProducts } from "@/hooks/use-products";

export default function CheckoutPage() {
  const { cart, clearCart } = useShop();
  const { data: products, loading } = useProducts();
  const [submitted, setSubmitted] = useState(false);

  const summaryItems = useMemo(
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

  const total = useMemo(
    () => summaryItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [summaryItems],
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <section className="panel" style={{ marginTop: "1rem" }}>
        <h1 className="page-title" style={{ fontSize: "1.7rem" }}>
          Order placed
        </h1>
        <p className="muted">Thanks for shopping. Your mock order has been submitted.</p>
        <Link href="/" className="button">
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">Checkout</h1>
      {loading ? <p className="muted">Loading checkout...</p> : null}

      <div className="checkout section-gap">
        <form className="panel checkout-form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" rows={4} required />
          </div>
          <button className="button" type="submit" disabled={summaryItems.length === 0}>
            Place order
          </button>
        </form>

        <aside className="panel checkout-summary">
          <h2 style={{ marginTop: 0, fontFamily: "var(--font-heading)" }}>Cart summary</h2>
          {summaryItems.length === 0 ? (
            <p className="muted">No items in cart.</p>
          ) : (
            <div className="list">
              {summaryItems.map(({ product, quantity }) => (
                <div key={product.product_id} className="row split-row">
                  <span className="item-line">
                    {product.name} x {quantity}
                  </span>
                  <strong>{formatCurrency(product.price * quantity)}</strong>
                </div>
              ))}
            </div>
          )}
          <hr style={{ borderColor: "var(--line)", margin: "0.8rem 0" }} />
          <p className="summary-total">Total: {formatCurrency(total)}</p>
        </aside>
      </div>
    </section>
  );
}
