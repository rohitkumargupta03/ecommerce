"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

const PRODUCTS_API = "https://fake-store-api.mock.beeceptor.com/api/products";

type ProductState = {
  data: Product[];
  loading: boolean;
  error: string | null;
};

export function useProducts(): ProductState {
  const [state, setState] = useState<ProductState>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    fetch(PRODUCTS_API)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        if (active) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error: Error) => {
        if (active) {
          setState({ data: [], loading: false, error: error.message });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
