"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem } from "@/types/product";

type ShopContextType = {
  cart: CartItem[];
  wishlist: number[];
  addToCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  clearCart: () => void;
};

const CART_KEY = "northstar_cart";
const WISHLIST_KEY = "northstar_wishlist";

const ShopContext = createContext<ShopContextType | undefined>(undefined);

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    return parseJson<CartItem[]>(localStorage.getItem(CART_KEY), []);
  });
  const [wishlist, setWishlist] = useState<number[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    return parseJson<number[]>(localStorage.getItem(WISHLIST_KEY), []);
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(productId: number) {
    setCart((current) => {
      const found = current.find((item) => item.productId === productId);
      if (found) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { productId, quantity: 1 }];
    });
  }

  function increaseQty(productId: number) {
    setCart((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function decreaseQty(productId: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId: number) {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }

  function addToWishlist(productId: number) {
    setWishlist((current) =>
      current.includes(productId) ? current : [...current, productId],
    );
  }

  function removeFromWishlist(productId: number) {
    setWishlist((current) => current.filter((id) => id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      addToWishlist,
      removeFromWishlist,
      clearCart,
    }),
    [cart, wishlist],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return context;
}
