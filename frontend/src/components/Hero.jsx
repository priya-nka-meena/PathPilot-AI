import { Link } from "react-router-dom";

const highlights = [
  "Personalized Career Guidance",
  "AI Career Advisor",
  "Live Job Recommendations",
  "Resume Intelligence",
  "Skill Gap Analysis",
  "Career Roadmaps",
];

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg animate-float lg:max-w-none">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-slate-500/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-xs text-slate-400">
            app.pathpilot.ai/dashboard
          </div>
        </div>

        <div className="grid grid-cols-5 gap-0">
          <div className="col-span-1 hidden border-r border-slate-100 bg-slate-50/50 p-3 sm:block">
            <div className="mb-4 h-8 w-8 rounded-lg bg-indigo-600" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full ${i === 0 ? "w-full bg-indigo-200" : "w-3/4 bg-slate-200"}`}
                />
              ))}
            </div>
          </div>

          <div className="col-span-5 space-y-4 p-4 sm:col-span-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Welcome back</p>
                <p className="text-sm font-semibold text-slate-900">Your Career Dashboard</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                AI Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-indigo-50 to-white p-3">
                <p className="text-xs text-slate-500">Match Score</p>
                <p className="mt-1 text-2xl font-bold text-indigo-600">94%</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-indigo-100">
                  <div className="h-full w-[94%] rounded-full bg-indigo-500" />
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-violet-50 to-white p-3">
                <p className="text-xs text-slate-500">Skills to Learn</p>
                <p className="mt-1 text-2xl font-bold text-violet-600">3</p>
                <p className="mt-1 text-xs text-slate-400">Python, AWS, SQL</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Top Job Matches
              </p>
              <div className="space-y-2">
                {[
                  { role: "Software Engineer", company: "TechCorp", match: "96%" },
                  { role: "Data Analyst", company: "Insight Labs", match: "91%" },
                ].map((job) => (
                  <div
                    key={job.role}
                    className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-900">{job.role}</p>
                      <p className="text-xs text-slate-400">{job.company}</p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600">{job.match}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
              <div className="flex gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                  AI
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  Based on your profile, I recommend focusing on cloud certifications
                  to strengthen your backend engineering path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-violet-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-slide-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-medium text-indigo-700">
                AI-Powered Career Intelligence
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your AI{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Career Copilot
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              PathPilot-AI combines machine learning, live job market data, and
              advanced AI to help you navigate your career with confidence. Get
              intelligent guidance tailored to your unique skills and ambitions.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                  <svg
                    className="h-4 w-4 shrink-0 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:shadow-xl"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="animate-fade-in lg:pl-4">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
