import { ProductCard } from "@/components/product-card";
import { fetchProducts } from "@/lib/api";

export default async function Home() {
  const products = await fetchProducts();
  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean)),
  ) as string[];
  const avgPrice =
    products.reduce((sum, product) => sum + product.price, 0) / Math.max(products.length, 1);
  const topRated = products.filter((product) => (product.rating ?? 0) >= 4.7).length;

  return (
    <section>
      <div className="hero">
        <p className="hero-badge">Spring Collection 2026</p>
        <h1>Shop smarter, live brighter.</h1>
        <p>
          Curated gadgets and lifestyle picks with faster browsing, cleaner details,
          and seamless cart and wishlist actions.
        </p>
        <div className="hero-actions">
          <a className="button" href="#catalog">
            Shop now
          </a>
          <a className="ghost-button" href="/cart">
            View cart
          </a>
        </div>
      </div>

      <section className="stat-grid" aria-label="Store highlights">
        <article className="stat-card">
          <p className="muted">Products</p>
          <strong>{products.length}</strong>
        </article>
        <article className="stat-card">
          <p className="muted">Categories</p>
          <strong>{categories.length}</strong>
        </article>
        <article className="stat-card">
          <p className="muted">Avg Price</p>
          <strong>${avgPrice.toFixed(2)}</strong>
        </article>
        <article className="stat-card">
          <p className="muted">Top Rated</p>
          <strong>{topRated}</strong>
        </article>
      </section>

      <section className="section-head">
        <h2>Browse by category</h2>
        <div className="category-row">
          {categories.map((category) => (
            <span key={category} className="category-pill">
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="section-head" id="catalog">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.product_id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
