import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage.jsx";
import { AuthEntryPage } from "./pages/auth/AuthEntryPage.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { RegisterPage } from "./pages/auth/RegisterPage.jsx";
import { CustomerDashboard } from "./pages/customer/CustomerDashboard.jsx";
import { FreelancerListingPage } from "./pages/customer/FreelancerListingPage.jsx";
import { FreelancerProfilePage } from "./pages/customer/FreelancerProfilePage.jsx";
import { ProductDetailPage } from "./pages/customer/ProductDetailPage.jsx";
import { ProductListingPage } from "./pages/customer/ProductListingPage.jsx";
import { StudentDashboard } from "./pages/student/StudentDashboard.jsx";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/freelancers" element={<FreelancerListingPage />} />
      <Route path="/freelancers/:id" element={<FreelancerProfilePage />} />
      <Route path="/login" element={<AuthEntryPage mode="login" />} />
      <Route path="/register" element={<AuthEntryPage mode="register" />} />
      <Route path="/auth/:role" element={<LoginPage />} />
      <Route path="/register/:role" element={<RegisterPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
