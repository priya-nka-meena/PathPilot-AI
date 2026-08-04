import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import authService from "../services/authService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const nextErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    } else if (values.fullName.trim().length < 2) {
      nextErrors.fullName = "Name must be at least 2 characters";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      nextErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await authService.register({ fullName: form.fullName, email: form.email, password: form.password });
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data || err.message || 'Registration failed';
      setErrors((prev) => ({ ...prev, form: JSON.stringify(msg) }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your personalized career journey with PathPilot-AI"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FormInput
          label="Full Name"
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          value={form.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fullName ? errors.fullName : undefined}
        />

        <FormInput
          label="Email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
        />

        <FormInput
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : undefined}
          hint={!errors.password ? "Must be at least 8 characters" : undefined}
        />

        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
        />

        {errors.form && <div className="text-sm text-red-600">{errors.form}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
