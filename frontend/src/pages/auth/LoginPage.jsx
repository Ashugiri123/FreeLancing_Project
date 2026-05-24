import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Field } from "../../components/forms/Field.jsx";
import { ThemeToggle } from "../../components/ThemeToggle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const roleNames = {
  student: "Student",
  customer: "Customer",
};

export function LoginPage() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });
  const roleName = roleNames[role] ?? "User";

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const user = await login({ ...form, role });
      navigate(`/${user.role}/dashboard`, { replace: true });
    } catch (error) {
      setStatus({ loading: false, error: error.message });
      return;
    }

    setStatus({ loading: false, error: "" });
  }

  return (
    <main className="auth-page">
      <div className="auth-theme-action">
        <ThemeToggle />
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-brand" aria-label="UNIVENDA">
          <div className="logo-mark" aria-hidden="true">
            U
          </div>
          <span>UNIVENDA</span>
        </div>
        <h1>{roleName} Login</h1>
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
        />
        <button className="primary-button" type="submit">
          {status.loading ? "Logging in..." : "Login"}
        </button>
        {status.error ? <p className="form-error">{status.error}</p> : null}
        <Link className="register-link" to={`/register/${role}`}>
          Register if you are new
        </Link>
      </form>
    </main>
  );
}
