function Logo({ className = "h-7 w-7" }) {
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

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Privacy", href: "#privacy" },
  { label: "Contact", href: "#contact" },
  {
    label: "GitHub",
    href: "https://github.com/priya-nka-meena/PathPilot-AI",
    external: true,
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="text-lg font-semibold text-slate-900">PathPilot-AI</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              An AI-powered career intelligence platform that combines machine
              learning, live job market data, and large language models to help
              students and professionals plan, grow, and succeed in their careers.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {footerLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-8">
          <p className="text-center text-sm text-slate-400">
            &copy; {currentYear} PathPilot-AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
