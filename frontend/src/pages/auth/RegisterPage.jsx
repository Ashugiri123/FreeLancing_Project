import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Field, TextArea } from "../../components/forms/Field.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const roleTitles = {
  student: "Student Registration",
  customer: "Customer Registration",
};

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
  alternatePhone: "",
  collegeName: "",
  course: "",
  graduationYear: "",
  aadhaarNumber: "",
  accountNumber: "",
  ifsc: "",
  purpose: "",
  address: "",
};

export function RegisterPage() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  const isStudent = role === "student";
  const title = roleTitles[role] ?? "Customer Registration";
  const [form, setForm] = useState(initialValues);
  const [files, setFiles] = useState({ profilePhoto: null, approvalDocument: null });
  const [status, setStatus] = useState({ loading: false, error: "", message: "" });

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function updateFile(name, file) {
    setFiles((current) => ({ ...current, [name]: file }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, error: "", message: "" });

    const formData = new FormData();
    Object.entries({ ...form, role }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (files.profilePhoto) {
      formData.append("profilePhoto", files.profilePhoto);
    }

    if (files.approvalDocument) {
      formData.append("approvalDocument", files.approvalDocument);
    }

    try {
      const data = await register(formData);
      setForm(initialValues);
      setFiles({ profilePhoto: null, approvalDocument: null });
      setStatus({
        loading: false,
        error: "",
        message: data.message || "Registration complete. You can log in now."
      });

      if (data.token) {
        navigate(`/${data.user.role}/dashboard`, { replace: true });
      }
    } catch (error) {
      setStatus({ loading: false, error: error.message, message: "" });
      return;
    }
  }

  return (
    <main className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="auth-brand register-brand" aria-label="UNIVENDA">
          <div className="logo-mark" aria-hidden="true">
            U
          </div>
          <span>UNIVENDA</span>
        </div>
        <h1>{title}</h1>

        <Field label="Full Name" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} required />
        <Field label="Email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
        <Field label="Password" type="password" value={form.password} onChange={(event) => updateField("password", event.target.value)} required />
        <Field label="Phone Number" value={form.phoneNumber} onChange={(event) => updateField("phoneNumber", event.target.value)} required />

        {isStudent ? (
          <>
            <Field label="Alternate Phone Number" value={form.alternatePhone} onChange={(event) => updateField("alternatePhone", event.target.value)} />
            <Field label="College Name" value={form.collegeName} onChange={(event) => updateField("collegeName", event.target.value)} required />
            <Field label="Course" value={form.course} onChange={(event) => updateField("course", event.target.value)} required />
            <Field label="Graduation Year" type="number" value={form.graduationYear} onChange={(event) => updateField("graduationYear", event.target.value)} required />
            <Field label="Aadhaar Number" value={form.aadhaarNumber} onChange={(event) => updateField("aadhaarNumber", event.target.value)} required />
            <h2 className="form-section-title">Bank Details</h2>
            <Field label="Account Number" value={form.accountNumber} onChange={(event) => updateField("accountNumber", event.target.value)} required />
            <Field label="IFSC" value={form.ifsc} onChange={(event) => updateField("ifsc", event.target.value)} required />
            <TextArea label="Purpose of joining" value={form.purpose} onChange={(event) => updateField("purpose", event.target.value)} required />
            <Field label="Profile Photo upload" type="file" accept="image/*" onChange={(event) => updateFile("profilePhoto", event.target.files?.[0] ?? null)} required />
            <Field label="College Approval document upload" type="file" onChange={(event) => updateFile("approvalDocument", event.target.files?.[0] ?? null)} required />
          </>
        ) : (
          <TextArea label="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} required />
        )}

        <button className="primary-button" type="submit">
          {status.loading ? "Registering..." : "Register"}
        </button>
        {status.error ? <p className="form-error">{status.error}</p> : null}
        {status.message ? <p className="form-success">{status.message}</p> : null}
      </form>
    </main>
  );
}
