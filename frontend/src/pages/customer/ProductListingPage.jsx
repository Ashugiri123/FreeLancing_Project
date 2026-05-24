import { useMemo, useState } from "react";
import { CategoryNav } from "../../components/products/CategoryNav.jsx";
import { FeaturedProductRow, ProductGrid } from "../../components/products/ProductCard.jsx";
import { ProductSearch } from "../../components/products/ProductSearch.jsx";
import { AppShell } from "../../components/layout/AppShell.jsx";
import { featuredBadges, productCategories, products, searchProducts } from "../../data/staticProducts.js";

export function ProductListingPage() {
  const [productQuery, setProductQuery] = useState("");

  const filteredProducts = useMemo(() => searchProducts(products, productQuery), [productQuery]);

  const featuredProducts = useMemo(
    () => products.filter((product) => featuredBadges.has(product.badge)).slice(0, 4),
    []
  );

  return (
    <AppShell title="Products">
      <div className="products-page page-transition">
        <section className="products-hero">
          <div className="products-hero-copy">
            <p className="eyebrow">Student marketplace</p>
            <h2>Find products from campus creators and sellers</h2>
            <p>Browse handmade goods, study gear, decor, books, and tech picks from verified student sellers.</p>
          </div>
          <div className="products-hero-stat">
            <strong>{products.length}</strong>
            <span>live picks today</span>
          </div>
        </section>

        <section className="products-toolbar panel">
          <div className="section-head compact-section-head">
            <div>
              <p className="eyebrow">Explore</p>
              <h2>Shop by search or category</h2>
            </div>
            <div className="filters">
              <ProductSearch products={products} query={productQuery} onQueryChange={setProductQuery} />
              <button className="secondary-button" type="button" onClick={() => setProductQuery("")}>
                Reset
              </button>
            </div>
          </div>
          <CategoryNav categories={productCategories} />
        </section>

        <section className="panel featured-products-panel">
          <div className="section-head compact-section-head">
            <div>
              <p className="eyebrow">Trending now</p>
              <h2>Featured products</h2>
            </div>
            <span className="result-count">Updated today</span>
          </div>
          <FeaturedProductRow products={featuredProducts} />
        </section>

        <section className="panel">
          <div className="section-head compact-section-head">
            <div>
              <p className="eyebrow">Catalog</p>
              <h2>All products</h2>
            </div>
            <span className="result-count">{filteredProducts.length} products</span>
          </div>
          <ProductGrid products={filteredProducts} />
          {filteredProducts.length === 0 ? <p className="empty-state">No products match that search yet.</p> : null}
        </section>
      </div>
    </AppShell>
  );
}
