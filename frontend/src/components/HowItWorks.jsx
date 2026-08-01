const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up for free and get instant access to your career intelligence dashboard.",
  },
  {
    number: "02",
    title: "Complete Profile",
    description: "Tell us about your education, experience, and career goals to personalize your journey.",
  },
  {
    number: "03",
    title: "Upload Resume",
    description: "Optionally upload your resume for deeper AI analysis of your skills and experience.",
    optional: true,
  },
  {
    number: "04",
    title: "AI Analyzes Your Profile",
    description: "Our engines evaluate your profile against live market data and career trends.",
  },
  {
    number: "05",
    title: "Receive Personalized Career Guidance",
    description: "Get job matches, skill recommendations, roadmaps, and AI mentoring tailored to you.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From signup to career clarity in five steps
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            PathPilot-AI makes it simple to go from uncertain to confident about your
            career direction.
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-indigo-200 via-violet-300 to-indigo-200" />

            <div className="relative grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-indigo-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <span className="text-sm font-bold text-indigo-600">{step.number}</span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="absolute top-8 hidden" aria-hidden="true">
                      <svg className="h-4 w-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}

                  <h3 className="mt-5 text-sm font-semibold text-slate-900">
                    {step.title}
                    {step.optional && (
                      <span className="ml-1 text-xs font-normal text-slate-400">(Optional)</span>
                    )}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile & tablet vertical timeline */}
        <div className="mt-12 lg:hidden">
          <div className="relative mx-auto max-w-md">
            <div className="absolute bottom-0 left-8 top-0 w-0.5 bg-gradient-to-b from-indigo-200 via-violet-300 to-indigo-200" />

            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="relative flex gap-6 pl-2">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-indigo-200 bg-white shadow-sm">
                    <span className="text-xs font-bold text-indigo-600">{step.number}</span>
                  </div>
                  <div className="pb-2 pt-1">
                    <h3 className="font-semibold text-slate-900">
                      {step.title}
                      {step.optional && (
                        <span className="ml-1 text-xs font-normal text-slate-400">(Optional)</span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
