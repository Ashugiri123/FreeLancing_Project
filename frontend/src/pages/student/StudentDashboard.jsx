import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Field, TextArea } from "../../components/forms/Field.jsx";
import { AppShell } from "../../components/layout/AppShell.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { supabase } from "../../config/supabase.js";

const emptyProduct = {
  title: "",
  description: "",
  price: "",
  category: ""
};

const emptyService = {
  skill: "",
  description: "",
  pricing: "",
  pricingType: "fixed",
  deliveryTime: ""
};

export function StudentDashboard() {
  const { user } = useAuth();
  const [product, setProduct] = useState(emptyProduct);
  const [service, setService] = useState(emptyService);
  const [productImages, setProductImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    loadStudentData();
  }, [user?.id]);

  async function loadStudentData() {
    if (!user?.id) {
      setProducts([]);
      setServices([]);
      return;
    }

    const [productResult, serviceResult] = await Promise.all([
      supabase.from("products").select("*").eq("seller_id", user.id).order("created_at", { ascending: false }),
      supabase.from("services").select("*").eq("student_id", user.id).order("created_at", { ascending: false })
    ]);

    if (productResult.error) {
      console.error("[supabase] Loading student products failed:", productResult.error.message);
    }

    if (serviceResult.error) {
      console.error("[supabase] Loading student services failed:", serviceResult.error.message);
    }

    setProducts((productResult.data || []).map((item) => ({ ...item, _id: item.id })));
    setServices((serviceResult.data || []).map((item) => ({
      ...item,
      _id: item.id,
      pricingType: item.pricing_type,
      deliveryTime: item.delivery_time
    })));
  }

  async function addProduct(event) {
    event.preventDefault();

    if (!user?.id) {
      return;
    }

    const { error } = await supabase.from("products").insert({
      seller_id: user.id,
      title: product.title,
      description: product.description,
      price: Number(product.price),
      category: product.category,
      images: productImages.map((image) => image.name),
      is_self_made: true
    });

    if (error) {
      console.error("[supabase] Product insert failed:", error.message);
      setNotice(error.message);
      return;
    }

    setProduct(emptyProduct);
    setProductImages([]);
    setNotice("Product added");
    await loadStudentData();
  }

  async function addService(event) {
    event.preventDefault();

    if (!user?.id) {
      return;
    }

    const { error } = await supabase.from("services").insert({
      student_id: user.id,
      skill: service.skill,
      description: service.description,
      pricing: Number(service.pricing),
      pricing_type: service.pricingType,
      delivery_time: service.deliveryTime
    });

    if (error) {
      console.error("[supabase] Service insert failed:", error.message);
      setNotice(error.message);
      return;
    }

    setService(emptyService);
    setNotice("Service added");
    await loadStudentData();
  }

  if (!user) {
    return (
      <AppShell title="Student Dashboard">
        <section className="panel gate-panel">
          <h2>Sell products or create freelance services</h2>
          <p>Browse is public. Login or register as a student when you want to start selling.</p>
          <div className="inline-actions">
            <Link className="text-button" to="/login">
              Login
            </Link>
            <Link className="primary-button" to="/register">
              Register
            </Link>
          </div>
        </section>
      </AppShell>
    );
  }

  if (user.role !== "student") {
    return (
      <AppShell title="Student Dashboard">
        <section className="panel gate-panel">
          <h2>Student access required</h2>
          <p>This area is only for student sellers and freelancers.</p>
          <div className="inline-actions">
            <Link className="text-button" to="/products">
              Browse products
            </Link>
            <Link className="primary-button" to="/freelancers">
              Browse freelancers
            </Link>
          </div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell title="Student Dashboard">
      {notice ? <p className="notice">{notice}</p> : null}
      <div className="dashboard-grid">
        <section className="panel">
          <h2>Product Selling</h2>
          <form className="stack" onSubmit={addProduct}>
            <Field label="Title" value={product.title} onChange={(event) => setProduct({ ...product, title: event.target.value })} required />
            <TextArea label="Description" value={product.description} onChange={(event) => setProduct({ ...product, description: event.target.value })} required />
            <Field label="Price" type="number" min="0" value={product.price} onChange={(event) => setProduct({ ...product, price: event.target.value })} required />
            <Field label="Category" value={product.category} onChange={(event) => setProduct({ ...product, category: event.target.value })} required />
            <Field label="Images" type="file" accept="image/*" multiple onChange={(event) => setProductImages(Array.from(event.target.files))} />
            <button className="primary-button" type="submit">
              Add product
            </button>
          </form>
          <div className="list">
            <h3>Manage products</h3>
            {products.map((item) => (
              <article className="row-item" key={item._id}>
                <strong>{item.title}</strong>
                <span>Rs {item.price} · {item.category}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2>Freelancing</h2>
          <form className="stack" onSubmit={addService}>
            <Field label="Skill" value={service.skill} onChange={(event) => setService({ ...service, skill: event.target.value })} required />
            <TextArea label="Description" value={service.description} onChange={(event) => setService({ ...service, description: event.target.value })} required />
            <Field label="Pricing" type="number" min="0" value={service.pricing} onChange={(event) => setService({ ...service, pricing: event.target.value })} required />
            <label className="field">
              <span>Pricing type</span>
              <select value={service.pricingType} onChange={(event) => setService({ ...service, pricingType: event.target.value })}>
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly</option>
              </select>
            </label>
            <Field label="Delivery time" value={service.deliveryTime} onChange={(event) => setService({ ...service, deliveryTime: event.target.value })} required />
            <button className="primary-button" type="submit">
              Create service/gig
            </button>
          </form>
          <div className="list">
            <h3>Manage services</h3>
            {services.map((item) => (
              <article className="row-item" key={item._id}>
                <strong>{item.skill}</strong>
                <span>Rs {item.pricing} · {item.pricingType} · {item.deliveryTime}</span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
