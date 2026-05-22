import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { supabase } from "../../config/supabase.js";

export function FreelancerProfilePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [service, setService] = useState(null);

  useEffect(() => {
    async function loadService() {
      const { data, error } = await supabase
        .from("services")
        .select("*, student:users!services_student_id_fkey(*)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("[supabase] Loading service failed:", error.message);
        setService(null);
        return;
      }

      setService({
        ...data,
        _id: data.id,
        pricingType: data.pricing_type,
        deliveryTime: data.delivery_time,
        student: data.student
          ? {
              fullName: data.student.full_name,
              phoneNumber: data.student.phone,
              studentProfile: data.student.student_profile
            }
          : null
      });
    }

    loadService();
  }, [id]);

  if (!service) {
    return (
      <AppShell title="Freelancer Profile">
        <p>Loading...</p>
      </AppShell>
    );
  }

  return (
    <AppShell title={service.student?.fullName || "Freelancer Profile"}>
      <Link className="back-link" to="/freelancers">
        Back
      </Link>
      <section className="detail-layout">
        <div className="profile-block">
          <div className="avatar">{service.student?.fullName?.charAt(0)}</div>
          <h2>{service.skill}</h2>
          <p>{service.student?.studentProfile?.collegeName}</p>
          <p>{service.student?.studentProfile?.course}</p>
        </div>
        <div className="detail-copy">
          <p>{service.description}</p>
          <h2>Rs {service.pricing} {service.pricingType}</h2>
          <p>{service.deliveryTime}</p>
          {user?.role === "customer" ? (
            <a className="primary-button" href={`tel:${service.student?.phoneNumber}`}>
              Hire/contact
            </a>
          ) : (
            <div className="action-gate">
              <p>Login or register as a customer to hire this freelancer.</p>
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
