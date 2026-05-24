import { Link } from "react-router-dom";

export function ProductCard({ product }) {
  return (
    <Link className="product-card" to={`/products/item/${product._id}`}>
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
  );
}

export function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export function FeaturedProductRow({ products }) {
  return (
    <div className="featured-product-row">
      {products.map((product) => (
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
  );
}
