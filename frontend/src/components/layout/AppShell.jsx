import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export function AppShell({ children, title }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand-small" to="/">
          <span className="mark" />
          UNIVENDA
        </Link>
        <nav className="topbar-nav" aria-label="Primary">
          <Link to="/products">Products</Link>
          <Link to="/freelancers">Freelancers</Link>
          {user?.role === "student" ? <Link to="/student/dashboard">Sell</Link> : null}
          {user?.role === "customer" ? <Link to="/customer/dashboard">Account</Link> : null}
        </nav>
        <div className="topbar-actions">
          <ThemeToggle />
          {user ? (
            <>
              <span>{user.fullName}</span>
              <button className="text-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-button" to="/login">
                Login
              </Link>
              <Link className="primary-button" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="workspace">
        {title ? <h1>{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
