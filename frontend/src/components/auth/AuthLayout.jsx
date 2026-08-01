import { Link } from "react-router-dom";

function Logo({ className = "h-9 w-9" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-indigo-600" />
      <path
        d="M8 22L16 8L24 22H8Z"
        className="fill-white/90"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="18" r="2" className="fill-indigo-600" />
    </svg>
  );
}

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white via-slate-50/80 to-white px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-violet-100/40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Logo />
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            PathPilot-AI
          </span>
        </Link>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
            )}
          </div>
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} PathPilot-AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
