import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 px-6 py-16 text-center shadow-2xl sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Start Building Your Career Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              Join PathPilot-AI for free and unlock personalized career guidance,
              live job recommendations, and AI-powered mentoring — all in one
              intelligent platform.
            </p>
            <div className="mt-10">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-100 hover:shadow-xl"
              >
                Get Started — It&apos;s Free
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              No credit card required. Set up your profile in minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
