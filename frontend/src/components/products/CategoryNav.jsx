import { Link } from "react-router-dom";

export function CategoryNav({ categories, activeSlug = "" }) {
  return (
    <div className="category-strip" aria-label="Product categories">
      <Link className={`category-chip ${activeSlug === "" ? "active" : ""}`} to="/products">
        <span className="category-icon">{"\u2726"}</span>
        <span>All</span>
      </Link>
      {categories.map((item) => (
        <Link
          className={`category-chip ${activeSlug === item.slug ? "active" : ""}`}
          key={item.slug}
          to={`/products/${item.slug}`}
        >
          <span className="category-icon">{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
