"use client";

import { useShop } from "@/context/shop-context";

export function ProductActions({ productId }: { productId: number }) {
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useShop();

  const wished = wishlist.includes(productId);

  return (
    <div className="row">
      <button className="button" type="button" onClick={() => addToCart(productId)}>
        Add to cart
      </button>
      <button
        className="ghost-button"
        type="button"
        onClick={() =>
          wished ? removeFromWishlist(productId) : addToWishlist(productId)
        }
      >
        {wished ? "Remove from wishlist" : "Add to wishlist"}
      </button>
    </div>
  );
}
