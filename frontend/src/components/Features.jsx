const features = [
  {
    title: "AI Career Advisor",
    description:
      "Chat with a Gemini-powered career mentor that understands your background and provides actionable advice for your next career move.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    color: "indigo",
  },
  {
    title: "Personalized Job Recommendations",
    description:
      "Receive job matches ranked by AI based on your skills, experience, and career goals — not just keyword matching.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
    color: "violet",
  },
  {
    title: "Live Job Search",
    description:
      "Access real-time job listings from live APIs, filtered and ranked intelligently so you never miss a relevant opportunity.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    color: "blue",
  },
  {
    title: "Resume Analysis",
    description:
      "Upload your resume and get instant AI-powered insights on strengths, weaknesses, and improvements to stand out to recruiters.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    color: "emerald",
  },
  {
    title: "Skill Gap Analysis",
    description:
      "Identify the exact skills you need to develop for your target roles with data-driven gap analysis and priority rankings.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    color: "amber",
  },
  {
    title: "Learning Roadmap",
    description:
      "Get a customized learning path with curated resources and milestones designed to close your skill gaps efficiently.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
    color: "rose",
  },
];

const colorMap = {
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "group-hover:border-indigo-200",
    shadow: "group-hover:shadow-indigo-100",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "group-hover:border-violet-200",
    shadow: "group-hover:shadow-violet-100",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "group-hover:border-blue-200",
    shadow: "group-hover:shadow-blue-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "group-hover:border-emerald-200",
    shadow: "group-hover:shadow-emerald-100",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "group-hover:border-amber-200",
    shadow: "group-hover:shadow-amber-100",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "group-hover:border-rose-200",
    shadow: "group-hover:shadow-rose-100",
  },
};

function FeatureCard({ feature }) {
  const colors = colorMap[feature.color];

  return (
    <div
      className={`group rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${colors.border} ${colors.shadow}`}
    >
      <div
        className={`mb-4 inline-flex rounded-xl p-3 ${colors.bg} ${colors.text} transition-transform duration-300 group-hover:scale-110`}
      >
        {feature.icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to accelerate your career
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From intelligent job matching to personalized learning paths, PathPilot-AI
            gives you the tools to make smarter career decisions.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
