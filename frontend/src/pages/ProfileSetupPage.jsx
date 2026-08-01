import { useState } from "react";

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

const INITIAL_FORM = {
  // Basic Information
  name: "Priyanka Sharma",
  college: "National Institute of Technology, Jaipur",
  degree: "B.Tech - Computer Science",
  graduationYear: "2024",
  location: "Bengaluru, India",

  // Career
  careerGoal: "Build reliable, scalable backend systems and grow into a platform engineering role.",
  interestedRoles: ["Backend Engineer", "Platform Engineer"],
  preferredCompanies: ["Google", "Stripe", "Amazon"],
  workPreference: "Remote",

  // Skills
  skills: ["Python", "Node.js", "PostgreSQL"],

  // Experience
  internships: ["Backend Intern - FinTech startup (6 months)"],
  projects: ["Distributed job scheduler - GitHub"] ,
  openSource: ["contributed to fastify plugins"],
  hackathons: ["Hack for Good 2022 - Runner-up"],
  experienceLevel: "Entry",

  // Education
  cgpa: "8.4",
  branch: "Computer Science",

  // Resume
  resume: null,

  // About
  about: "",

  // Preferences
  preferredCity: "Bengaluru",
  preferredCountry: "India",
  jobType: "Full-time",
  internshipOrFullTime: "Full-time",
  companyType: "Startup",

  // Privacy
  allowPersonalization: true,
  allowResumeAnalysis: false,
};

function Section({ title, children, optional }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {optional && <div className="text-xs text-slate-400 mt-1">Optional</div>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ProfileSetupPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [skillInput, setSkillInput] = useState("");
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setSaved(false);
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (!form.skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      setForm((p) => ({ ...p, skills: [...p.skills, skill] }));
    }
    setSkillInput("");
  };

  const removeSkill = (s) => {
    setForm((p) => ({ ...p, skills: p.skills.filter((x) => x !== s) }));
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0] ?? null;
    setForm((p) => ({ ...p, resume: f }));
    setSaved(false);
  };

  const handleArrayField = (name, csv) => {
    const arr = csv.split(",").map((s) => s.trim()).filter(Boolean);
    setForm((p) => ({ ...p, [name]: arr }));
    setSaved(false);
  };

  const handleSave = () => {
    // Keep data in React state only. No backend calls.
    console.log("Saved profile (client-only):", form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetToPlaceholder = () => {
    setForm(INITIAL_FORM);
    setSaved(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Profile</h1>
              <div className="text-sm text-slate-500">Update your details to improve recommendations — optional and editable anytime.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={resetToPlaceholder} className="text-sm px-3 py-2 rounded-md border border-slate-200 bg-white">Reset</button>
            <button onClick={handleSave} className="text-sm px-4 py-2 rounded-md bg-indigo-600 text-white">Save Changes</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Section title="1. Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600">Full name</label>
                <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Location (City)</label>
                <input name="location" value={form.location} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">College</label>
                <input name="college" value={form.college} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Degree</label>
                <input name="degree" value={form.degree} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Graduation year</label>
                <input name="graduationYear" value={form.graduationYear} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
            </div>
          </Section>

          <Section title="2. Career">
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-600">Career goal</label>
                <input name="careerGoal" value={form.careerGoal} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-slate-600">Interested roles (comma separated)</label>
                <input defaultValue={form.interestedRoles.join(", ")} onBlur={(e) => handleArrayField("interestedRoles", e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-slate-600">Preferred companies (comma separated)</label>
                <input defaultValue={form.preferredCompanies.join(", ")} onBlur={(e) => handleArrayField("preferredCompanies", e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-slate-600">Work preference</label>
                <select name="workPreference" value={form.workPreference} onChange={handleChange} className="mt-1 rounded-md border px-3 py-2">
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Onsite</option>
                </select>
              </div>
            </div>
          </Section>

          <Section title="3. Skills">
            <div>
              <div className="flex gap-2 flex-wrap">
                {form.skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                    {s}
                    <button onClick={() => removeSkill(s)} className="ml-1 text-indigo-600">✕</button>
                  </span>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add skill (e.g., Redis)" className="rounded-md border px-3 py-2 flex-1" />
                <button onClick={addSkill} className="px-3 py-2 bg-slate-900 text-white rounded-md">Add</button>
              </div>
            </div>
          </Section>

          <Section title="4. Experience">
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-600">Internships</label>
                <input name="internships" value={form.internships.join(", ")} onBlur={(e) => handleArrayField("internships", e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Projects</label>
                <input name="projects" value={form.projects.join(", ")} onBlur={(e) => handleArrayField("projects", e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Open source contributions</label>
                <input name="openSource" value={form.openSource.join(", ")} onBlur={(e) => handleArrayField("openSource", e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Hackathons / Awards</label>
                <input name="hackathons" value={form.hackathons.join(", ")} onBlur={(e) => handleArrayField("hackathons", e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm text-slate-600">Experience level</label>
                <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className="mt-1 rounded-md border px-3 py-2">
                  <option>Intern</option>
                  <option>Entry</option>
                  <option>Mid</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>
          </Section>

          <Section title="5. Education">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-600">CGPA</label>
                <input name="cgpa" value={form.cgpa} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Branch</label>
                <input name="branch" value={form.branch} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Graduation year</label>
                <input name="graduationYear" value={form.graduationYear} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
            </div>
          </Section>

          <Section title="6. Resume" optional>
            <div>
              <label className="block text-sm text-slate-600">Upload resume (optional)</label>
              <input type="file" onChange={handleFile} className="mt-2" />
              {form.resume ? (
                <div className="mt-2 text-sm text-slate-600">Selected: {form.resume.name}</div>
              ) : (
                <div className="mt-2 text-sm text-slate-500">You can skip this and upload later.</div>
              )}
            </div>
          </Section>

          <Section title="7. About Yourself" optional>
            <div>
              <label className="block text-sm text-slate-600">Tell the AI anything about yourself</label>
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder={"Tell the AI anything about yourself, your goals, interests, strengths, weaknesses, dream companies, or concerns. The more context you provide, the better personalized career guidance the AI can generate."}
                className="mt-2 w-full rounded-md border px-3 py-2 min-h-[140px]"
              />
              <div className="text-xs text-slate-400 mt-2">Optional — more context helps recommendations.</div>
            </div>
          </Section>

          <Section title="8. Preferences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600">Preferred city</label>
                <input name="preferredCity" value={form.preferredCity} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Preferred country</label>
                <input name="preferredCountry" value={form.preferredCountry} onChange={handleChange} className="mt-1 w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600">Job type</label>
                <select name="jobType" value={form.jobType} onChange={handleChange} className="mt-1 rounded-md border px-3 py-2">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-600">Internship / Full-time</label>
                <select name="internshipOrFullTime" value={form.internshipOrFullTime} onChange={handleChange} className="mt-1 rounded-md border px-3 py-2">
                  <option>Internship</option>
                  <option>Full-time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-600">Startup / MNC</label>
                <select name="companyType" value={form.companyType} onChange={handleChange} className="mt-1 rounded-md border px-3 py-2">
                  <option>Startup</option>
                  <option>MNC</option>
                </select>
              </div>
            </div>
          </Section>

          <Section title="9. Privacy">
            <div className="space-y-3">
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" name="allowPersonalization" checked={form.allowPersonalization} onChange={handleChange} className="rounded-md" />
                <span className="text-sm">Allow AI to personalize recommendations</span>
              </label>

              <label className="inline-flex items-center gap-3">
                <input type="checkbox" name="allowResumeAnalysis" checked={form.allowResumeAnalysis} onChange={handleChange} className="rounded-md" />
                <span className="text-sm">Allow resume analysis</span>
              </label>

              <div className="text-xs text-slate-400">Changes are saved locally in the browser state for now. No data is sent to any server.</div>
            </div>
          </Section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-900">Profile progress</h4>
            <p className="text-xs text-slate-500 mt-2">Based on provided details</p>
            <div className="mt-3">
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-indigo-600" style={{ width: '28%' }} />
              </div>
              <div className="text-xs text-gray-400 mt-2">28% complete</div>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={handleSave} className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-md text-sm">Save</button>
              <button onClick={() => alert('You can continue later.')} className="px-3 py-2 border rounded-md text-sm">Skip</button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-900">Tips</h4>
            <ul className="mt-2 text-sm text-slate-600 space-y-2">
              <li>Fill in about yourself to get better AI suggestions.</li>
              <li>Upload your resume later — it is optional.</li>
              <li>Keep skills concise and prioritized.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-900">Status</h4>
            <div className="mt-2 text-sm text-slate-600">{saved ? 'Saved locally' : 'Not saved'}</div>
          </div>
        </aside>
      </main>
    </div>
  );
}
