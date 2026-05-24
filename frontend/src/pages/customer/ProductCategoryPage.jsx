import { useMemo, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { CategoryNav } from "../../components/products/CategoryNav.jsx";
import { FeaturedProductRow, ProductGrid } from "../../components/products/ProductCard.jsx";
import { ProductSearch } from "../../components/products/ProductSearch.jsx";
import { AppShell } from "../../components/layout/AppShell.jsx";
import {
  featuredBadges,
  getCategoryBySlug,
  productCategories,
  products,
  searchProducts
} from "../../data/staticProducts.js";

export function ProductCategoryPage() {
  const { categorySlug } = useParams();
  const [productQuery, setProductQuery] = useState("");
  const category = getCategoryBySlug(categorySlug);

  const categoryProducts = useMemo(
    () => products.filter((product) => product.categorySlug === categorySlug),
    [categorySlug]
  );

  const searchedProducts = useMemo(
    () => searchProducts(categoryProducts, productQuery),
    [categoryProducts, productQuery]
  );

  const featuredProducts = useMemo(
    () => categoryProducts.filter((product) => featuredBadges.has(product.badge)).slice(0, 4),
    [categoryProducts]
  );

  const trendingProducts = useMemo(
    () =>
      categoryProducts
        .filter((product) => ["Trending", "Hot"].includes(product.badge))
        .concat(categoryProducts.filter((product) => product.badge === "Featured"))
        .slice(0, 3),
    [categoryProducts]
  );

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  return (
    <AppShell title={category.name}>
      <div className="category-page page-transition" key={category.slug}>
        <Link className="back-link category-back-link" to="/products">
          Back to products
        </Link>

        <section className="category-hero">
          <div className="category-hero-copy">
            <span className="category-hero-icon">{category.icon}</span>
            <p className="eyebrow">Category</p>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
            <small>{category.heroNote}</small>
          </div>
          <div className="category-hero-panel">
            <strong>{categoryProducts.length}</strong>
            <span>student listings</span>
            <p>{category.sellerPrompt}</p>
          </div>
        </section>

        <section className="products-toolbar panel">
          <div className="section-head compact-section-head">
            <div>
              <p className="eyebrow">Browse {category.name}</p>
              <h2>Search this category</h2>
            </div>
            <div className="filters">
              <ProductSearch
                products={categoryProducts}
                query={productQuery}
                onQueryChange={setProductQuery}
                placeholder={`Search ${category.name.toLowerCase()} products...`}
              />
              <button className="secondary-button" type="button" onClick={() => setProductQuery("")}>
                Reset
              </button>
            </div>
          </div>
          <CategoryNav categories={productCategories} activeSlug={category.slug} />
        </section>

        <section className="panel featured-products-panel">
          <div className="section-head compact-section-head">
            <div>
              <p className="eyebrow">Featured picks</p>
              <h2>{category.name} products to notice</h2>
            </div>
            <span className="result-count">{featuredProducts.length || categoryProducts.length} picks</span>
          </div>
          <FeaturedProductRow products={featuredProducts.length ? featuredProducts : categoryProducts} />
        </section>

        <section className="category-main-grid">
          <div className="panel">
            <div className="section-head compact-section-head">
              <div>
                <p className="eyebrow">Available now</p>
                <h2>{category.name} catalog</h2>
              </div>
              <span className="result-count">{searchedProducts.length} products</span>
            </div>
            <ProductGrid products={searchedProducts} />
            {searchedProducts.length === 0 ? <p className="empty-state">No products match that search yet.</p> : null}
          </div>

          <aside className="category-side-panel">
            <section className="panel">
              <p className="eyebrow">Trending</p>
              <h2>Popular in {category.name}</h2>
              <div className="trending-product-list">
                {(trendingProducts.length ? trendingProducts : categoryProducts).map((product) => (
                  <Link className="trending-product-item" key={product._id} to={`/products/item/${product._id}`}>
                    <img src={product.image} alt={product.title} />
                    <span>
                      <strong>{product.title}</strong>
                      <small>Rs {product.price}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="seller-cta-panel">
              <p className="eyebrow">For student sellers</p>
              <h2>Have something for {category.name.toLowerCase()} buyers?</h2>
              <p>{category.sellerPrompt}</p>
              <Link className="primary-button" to="/register">
                Start selling
              </Link>
            </section>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}
