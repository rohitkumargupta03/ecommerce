import { Product } from "@/types/product";

const API_BASE = "https://fake-store-api.mock.beeceptor.com";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/api/products`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = (await response.json()) as Product[];
  return data;
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const products = await fetchProducts();
  return products.find((product) => product.product_id === id) ?? null;
}
