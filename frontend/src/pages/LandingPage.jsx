import { Link } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell.jsx";

export function LandingPage() {
  return (
    <AppShell title="">
      <main className="landing">
        <div className="landing-brand" aria-label="UNIVENDA">
          <div className="logo-mark" aria-hidden="true">
            U
          </div>
          <h1>UNIVENDA</h1>
        </div>
        <div className="role-actions">
          <Link className="primary-button" to="/products">
            Products
          </Link>
          <Link className="primary-button primary-button-light" to="/freelancers">
            Freelancers
          </Link>
        </div>
      </main>
    </AppShell>
  );
}
