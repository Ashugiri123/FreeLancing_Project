import { Link } from "react-router-dom";

export function AuthEntryPage({ mode }) {
  const isLogin = mode === "login";
  const basePath = isLogin ? "/auth" : "/register";
  const title = isLogin ? "Login" : "Register";

  return (
    <main className="auth-entry-page">
      <div className="auth-entry-card">
        <div className="logo-mark" aria-hidden="true">
          U
        </div>
        <h1>{title}</h1>
        <div className="role-actions">
          <Link className="primary-button" to={`${basePath}/student`}>
            Student/Seller
          </Link>
          <Link className="primary-button primary-button-light" to={`${basePath}/customer`}>
            Customer
          </Link>
        </div>
      </div>
    </main>
  );
}
