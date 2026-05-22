import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell.jsx";

const categories = [
  { name: "Art", icon: "\u{1F3A8}" },
  { name: "Fashion", icon: "\u{1F455}" },
  { name: "Electronics", icon: "\u{1F3A7}" },
  { name: "Handmade", icon: "\u{1F9F5}" },
  { name: "Tech", icon: "\u{1F4BB}" },
  { name: "Books", icon: "\u{1F4DA}" },
  { name: "Home Decor", icon: "\u{1FAB4}" }
];

const productImage = (title, category, color, accent) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${color}" />
          <stop offset="1" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill="url(#bg)" />
      <circle cx="510" cy="88" r="112" fill="rgba(255,255,255,.18)" />
      <circle cx="88" cy="390" r="138" fill="rgba(255,255,255,.14)" />
      <rect x="126" y="112" width="388" height="248" rx="34" fill="rgba(255,255,255,.9)" />
      <rect x="166" y="166" width="308" height="26" rx="13" fill="${accent}" opacity=".75" />
      <rect x="166" y="218" width="238" height="22" rx="11" fill="${color}" opacity=".78" />
      <rect x="166" y="270" width="282" height="22" rx="11" fill="#171717" opacity=".16" />
      <text x="320" y="390" text-anchor="middle" fill="#171717" font-family="Arial, sans-serif" font-size="34" font-weight="800">${title}</text>
      <text x="320" y="426" text-anchor="middle" fill="#4c4c45" font-family="Arial, sans-serif" font-size="22" font-weight="700">${category}</text>
    </svg>
  `)}`;

const products = [
  {
    _id: "static-1",
    title: "Canvas Mini Prints",
    price: 449,
    sellerName: "Aarav Studio",
    category: "Art",
    badge: "Trending",
    image: productImage("Mini Prints", "Art", "#f1b84b", "#126b58")
  },
  {
    _id: "static-2",
    title: "Campus Denim Tote",
    price: 699,
    sellerName: "Thread Lane",
    category: "Fashion",
    badge: "Featured",
    image: productImage("Denim Tote", "Fashion", "#93b7be", "#d97941")
  },
  {
    _id: "static-3",
    title: "Wireless Study Earbuds",
    price: 1299,
    sellerName: "Byte Cart",
    category: "Electronics",
    badge: "Hot",
    image: productImage("Earbuds", "Electronics", "#8fa8ff", "#202b52")
  },
  {
    _id: "static-4",
    title: "Handwoven Desk Mat",
    price: 549,
    sellerName: "Made by Mira",
    category: "Handmade",
    badge: "New",
    image: productImage("Desk Mat", "Handmade", "#f0c7a1", "#8b5d33")
  },
  {
    _id: "static-5",
    title: "USB-C Hub Pro",
    price: 1599,
    sellerName: "TechNest",
    category: "Tech",
    badge: "Trending",
    image: productImage("USB-C Hub", "Tech", "#8fd6c7", "#18463f")
  },
  {
    _id: "static-6",
    title: "Second-Hand Design Books",
    price: 899,
    sellerName: "Page Market",
    category: "Books",
    badge: "Featured",
    image: productImage("Design Books", "Books", "#f4d35e", "#5f6f52")
  },
  {
    _id: "static-7",
    title: "Ceramic Plant Pot",
    price: 399,
    sellerName: "Dorm Bloom",
    category: "Home Decor",
    badge: "New",
    image: productImage("Plant Pot", "Home Decor", "#a8d5ba", "#536f55")
  },
  {
    _id: "static-8",
    title: "Laptop Stand Lite",
    price: 1199,
    sellerName: "DeskLab",
    category: "Tech",
    badge: "Hot",
    image: productImage("Laptop Stand", "Tech", "#c0b7ff", "#514f8f")
  }
];

export function ProductListingPage() {
  const [productQuery, setProductQuery] = useState("");
  const [category, setCategory] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const query = productQuery.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!query) return [];

    return products
      .filter((product) => product.title.toLowerCase().includes(query))
      .slice(0, 5);
  }, [query]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.sellerName.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      const matchesCategory = !category || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [category, query]);

  const featuredProducts = useMemo(
    () => products.filter((product) => ["Trending", "Featured", "Hot"].includes(product.badge)).slice(0, 4),
    []
  );

  function selectSuggestion(title) {
    setProductQuery(title);
    setShowSuggestions(false);
  }

  return (
    <AppShell title="Products">
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
            <label className="field autocomplete-search">
              <span>Search products</span>
              <input
                type="search"
                placeholder="Try books, earbuds, tote..."
                value={productQuery}
                onBlur={() => window.setTimeout(() => setShowSuggestions(false), 140)}
                onChange={(event) => {
                  setProductQuery(event.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {showSuggestions && suggestions.length > 0 ? (
                <div className="suggestions-dropdown">
                  {suggestions.map((product) => (
                    <button
                      className="suggestion-item"
                      key={product._id}
                      type="button"
                      onMouseDown={() => selectSuggestion(product.title)}
                    >
                      <strong>{product.title}</strong>
                      <span>{product.category} by {product.sellerName}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </label>
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setCategory("");
                setProductQuery("");
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="category-strip" aria-label="Product categories">
          <button className={`category-chip ${category === "" ? "active" : ""}`} type="button" onClick={() => setCategory("")}>
            <span className="category-icon">{"\u2726"}</span>
            <span>All</span>
          </button>
          {categories.map((item) => (
            <button
              className={`category-chip ${category === item.name ? "active" : ""}`}
              key={item.name}
              type="button"
              onClick={() => setCategory(item.name)}
            >
              <span className="category-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel featured-products-panel">
        <div className="section-head compact-section-head">
          <div>
            <p className="eyebrow">Trending now</p>
            <h2>Featured products</h2>
          </div>
          <span className="result-count">Updated today</span>
        </div>
        <div className="featured-product-row">
          {featuredProducts.map((product) => (
            <article className="featured-product-card" key={product._id}>
              <img src={product.image} alt={product.title} />
              <div>
                <span className="product-badge">{product.badge}</span>
                <strong>{product.title}</strong>
                <p>Rs {product.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-head compact-section-head">
          <div>
            <p className="eyebrow">Catalog</p>
            <h2>{category || "All products"}</h2>
          </div>
          <span className="result-count">{filteredProducts.length} products</span>
        </div>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link className="product-card" to={`/products/${product._id}`} key={product._id}>
              <div className="product-thumb">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-card-copy">
                <span className="product-category">{product.category}</span>
                <strong>{product.title}</strong>
                <span>{product.sellerName}</span>
              </div>
              <div className="product-card-footer">
                <strong>Rs {product.price}</strong>
                <span>{product.badge}</span>
              </div>
            </Link>
          ))}
        </div>
        {filteredProducts.length === 0 ? <p className="empty-state">No products match that search yet.</p> : null}
      </section>
    </AppShell>
  );
}
