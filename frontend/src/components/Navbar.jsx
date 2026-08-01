import { useState } from "react";
import { Link } from "react-router-dom";

function Logo({ className = "h-8 w-8" }) {
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

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600">
            PathPilot-AI
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200/60 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-lg bg-slate-900 px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
