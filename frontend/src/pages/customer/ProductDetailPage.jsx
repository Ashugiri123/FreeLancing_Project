import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { supabase } from "../../config/supabase.js";
import { products } from "../../data/staticProducts.js";

export function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const staticProduct = products.find((item) => item._id === id);

      if (staticProduct) {
        setProduct({
          ...staticProduct,
          images: [staticProduct.image],
          description: `${staticProduct.title} is a temporary marketplace listing from ${staticProduct.sellerName}. Backend product details will be connected later.`,
          seller: {
            fullName: staticProduct.sellerName,
            phoneNumber: ""
          }
        });
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*, seller:users!products_seller_id_fkey(*)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("[supabase] Loading product failed:", error.message);
        setProduct(null);
        return;
      }

      setProduct({
        ...data,
        _id: data.id,
        seller: data.seller
          ? {
              fullName: data.seller.full_name,
              phoneNumber: data.seller.phone
            }
          : null
      });
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <AppShell title="Product Detail">
        <p>Loading...</p>
      </AppShell>
    );
  }

  return (
    <AppShell title={product.title}>
      <Link className="back-link" to="/products">
        Back
      </Link>
      <section className="detail-layout">
        <div className="detail-image">
          {product.images?.[0] ? <img src={product.images[0]} alt={product.title} /> : <span>{product.category}</span>}
        </div>
        <div className="detail-copy">
          <p>{product.description}</p>
          <h2>Rs {product.price}</h2>
          <p>{product.category}</p>
          <p>{product.seller?.fullName}</p>
          {user?.role === "customer" ? (
            <a className="primary-button" href={`tel:${product.seller?.phoneNumber}`}>
              Contact seller
            </a>
          ) : (
            <div className="action-gate">
              <p>Login or register as a customer to buy this product.</p>
              <div className="inline-actions">
                <Link className="text-button" to="/login">
                  Login
                </Link>
                <Link className="primary-button" to="/register">
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
