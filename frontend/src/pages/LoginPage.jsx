import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values) => {
    const nextErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      nextErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = { ...form, [name]: type === "checkbox" ? checked : value };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/");
    }, 400);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your career journey with PathPilot-AI"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : undefined}
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
            />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <a
            href="#forgot-password"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
