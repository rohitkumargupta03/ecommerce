"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { useShop } from "@/context/shop-context";

export function Header() {
  const pathname = usePathname();
  const { cart, wishlist } = useShop();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const cartCount = mounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const wishlistCount = mounted ? wishlist.length : 0;

  function isActive(path: string): boolean {
    return pathname === path;
  }

  return (
    <header className="top-nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          Northstar Market
        </Link>
        <nav className="nav-links">
          <Link
            href="/"
            className="chip-link"
            style={isActive("/") ? { borderColor: "var(--accent)" } : undefined}
          >
            Products
          </Link>
          <Link
            href="/wishlist"
            className="chip-link"
            style={
              isActive("/wishlist") ? { borderColor: "var(--accent)" } : undefined
            }
          >
            Wishlist ({wishlistCount})
          </Link>
          <Link
            href="/cart"
            className="chip-link"
            style={isActive("/cart") ? { borderColor: "var(--accent)" } : undefined}
          >
            Cart ({cartCount})
          </Link>
          <Link
            href="/checkout"
            className="chip-link"
            style={
              isActive("/checkout") ? { borderColor: "var(--accent)" } : undefined
            }
          >
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
