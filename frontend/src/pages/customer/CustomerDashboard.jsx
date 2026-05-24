import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Field } from "../../components/forms/Field.jsx";
import { AppShell } from "../../components/layout/AppShell.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { supabase } from "../../config/supabase.js";

export function CustomerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [productQuery, setProductQuery] = useState("");
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");

  useEffect(() => {
    loadProducts();
    loadServices();
  }, []);

  async function loadProducts() {
    let query = supabase.from("products").select("*").order("created_at", { ascending: false });

    if (productQuery) {
      query = query.or(`title.ilike.%${productQuery}%,description.ilike.%${productQuery}%`);
    }

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[supabase] Loading products failed:", error.message);
      setProducts([]);
      return;
    }

    setProducts((data || []).map((item) => ({ ...item, _id: item.id })));
  }

  async function loadServices() {
    let query = supabase
      .from("services")
      .select("*, student:users!services_student_id_fkey(*)")
      .order("created_at", { ascending: false });

    if (skill) {
      query = query.ilike("skill", `%${skill}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("[supabase] Loading services failed:", error.message);
      setServices([]);
      return;
    }

    setServices((data || []).map((item) => ({
      ...item,
      _id: item.id,
      pricingType: item.pricing_type,
      deliveryTime: item.delivery_time,
      student: item.student
        ? {
            fullName: item.student.full_name,
            phoneNumber: item.student.phone,
            studentProfile: item.student.student_profile
          }
        : null
    })));
  }

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  return (
    <AppShell title="Customer Dashboard">
      {!user ? (
        <section className="panel gate-panel">
          <h2>Browse first, sign in when you are ready</h2>
          <p>You can explore products and freelancers without login. Authentication is only needed when you want to buy or hire.</p>
          <div className="inline-actions">
            <Link className="text-button" to="/products">
              Products
            </Link>
            <Link className="primary-button" to="/freelancers">
              Freelancers
            </Link>
          </div>
        </section>
      ) : null}
      <div className="customer-sections">
        <section className="panel">
          <div className="section-head">
            <h2>Buy Products</h2>
            <div className="filters">
              <Field label="Search" value={productQuery} onChange={(event) => setProductQuery(event.target.value)} />
              <label className="field">
                <span>Filters</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="">All categories</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <button className="secondary-button" onClick={loadProducts}>
                Apply
              </button>
            </div>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <Link className="product-card" to={`/products/item/${product._id}`} key={product._id}>
                <div className="product-thumb">
                  {product.images?.[0] ? <img src={product.images[0]} alt={product.title} /> : <span>{product.category}</span>}
                </div>
                <strong>{product.title}</strong>
                <span>Rs {product.price}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-head">
            <h2>Hire Students</h2>
            <div className="filters">
              <Field label="Search freelancers by skill" value={skill} onChange={(event) => setSkill(event.target.value)} />
              <button className="secondary-button" onClick={loadServices}>
                Search
              </button>
            </div>
          </div>
          <div className="freelancer-list">
            {services.map((service) => (
              <Link className="row-item clickable" to={`/freelancers/${service._id}`} key={service._id}>
                <strong>{service.student?.fullName} · {service.skill}</strong>
                <span>Rs {service.pricing} {service.pricingType} · {service.deliveryTime}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
