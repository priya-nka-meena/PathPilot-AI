import { useState, useEffect } from "react";
import profileService from "../services/profileService";

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
  name: "",
  college: "",
  degree: "",
  graduationYear: "",
  location: "",

  // Career
  careerGoal: "",
  interestedRoles: [],
  preferredCompanies: [],
  workPreference: "",

  // Skills
  skills: [],

  // Experience
  internships: [],
  projects: [],
  openSource: [],
  hackathons: [],
  experienceLevel: "",

  // Education
  cgpa: "",
  branch: "",

  // Resume
  resume: null,

  // About
  about: "",

  // Preferences
  preferredCity: "",
  preferredCountry: "",
  jobType: "",
  internshipOrFullTime: "",
  companyType: "",

  // Privacy
  allowPersonalization: true,
  allowResumeAnalysis: false,

  // User info (read-only from backend)
  email: "",
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await profileService.getProfile();
        if (!mounted || !data) return;
        // Map backend profile fields to frontend form structure
        const mapped = {
          // Basic Information
          name: data.user?.full_name || INITIAL_FORM.name,
          email: data.user?.email || INITIAL_FORM.email,
          location: data.location || INITIAL_FORM.location,
          college: data.college || INITIAL_FORM.college,
          degree: data.degree || INITIAL_FORM.degree,
          graduationYear: data.graduation_year || INITIAL_FORM.graduationYear,
          branch: data.branch || INITIAL_FORM.branch,
          cgpa: data.cgpa || INITIAL_FORM.cgpa,
          // Career
          careerGoal: data.career_goal || INITIAL_FORM.careerGoal,
          interestedRoles: Array.isArray(data.interested_roles) ? data.interested_roles : INITIAL_FORM.interestedRoles,
          preferredCompanies: Array.isArray(data.preferred_companies) ? data.preferred_companies : INITIAL_FORM.preferredCompanies,
          workPreference: data.work_preference || INITIAL_FORM.workPreference,
          // Skills
          skills: Array.isArray(data.skills) ? data.skills : INITIAL_FORM.skills,
          // Experience
          internships: Array.isArray(data.internships) ? data.internships : INITIAL_FORM.internships,
          projects: Array.isArray(data.projects) ? data.projects : INITIAL_FORM.projects,
          openSource: Array.isArray(data.open_source_contributions) ? data.open_source_contributions : INITIAL_FORM.openSource,
          hackathons: Array.isArray(data.hackathons) ? data.hackathons : INITIAL_FORM.hackathons,
          experienceLevel: data.experience_level || INITIAL_FORM.experienceLevel,
          // About
          about: data.bio || INITIAL_FORM.about,
          // Preferences
          preferredCity: data.preferred_city || INITIAL_FORM.preferredCity,
          preferredCountry: data.preferred_country || INITIAL_FORM.preferredCountry,
          jobType: data.job_type || INITIAL_FORM.jobType,
          internshipOrFullTime: data.internship_or_fulltime || INITIAL_FORM.internshipOrFullTime,
          companyType: data.company_type || INITIAL_FORM.companyType,
          // Privacy
          allowPersonalization: data.allow_personalization !== undefined ? data.allow_personalization : INITIAL_FORM.allowPersonalization,
          allowResumeAnalysis: data.allow_resume_analysis !== undefined ? data.allow_resume_analysis : INITIAL_FORM.allowResumeAnalysis,
        };
        setForm((p) => ({ ...p, ...mapped }));
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

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

  const handleSave = async () => {
    setSaved(false);
    try {
      // Validate CGPA if provided
      if (form.cgpa && isNaN(parseFloat(form.cgpa))) {
        alert('CGPA must be a valid number.');
        return;
      }
      // Validate graduation year if provided
      if (form.graduationYear && !/^(19|20)\d{2}$/.test(form.graduationYear)) {
        alert('Graduation year must be a valid year (e.g., 2024).');
        return;
      }
      // Map form to backend profile fields
      const payload = {
        // Basic Information
        location: form.location,
        college: form.college,
        degree: form.degree,
        branch: form.branch,
        graduation_year: form.graduationYear,
        cgpa: form.cgpa,
        // Career
        career_goal: form.careerGoal,
        interested_roles: form.interestedRoles,
        preferred_companies: form.preferredCompanies,
        work_preference: form.workPreference,
        // Skills
        skills: form.skills,
        // Experience
        internships: form.internships,
        projects: form.projects,
        open_source_contributions: form.openSource,
        hackathons: form.hackathons,
        experience_level: form.experienceLevel,
        // About
        bio: form.about,
        // Preferences
        preferred_city: form.preferredCity,
        preferred_country: form.preferredCountry,
        job_type: form.jobType,
        internship_or_fulltime: form.internshipOrFullTime,
        company_type: form.companyType,
        // Privacy
        allow_personalization: form.allowPersonalization,
        allow_resume_analysis: form.allowResumeAnalysis,
      };
      await profileService.updateProfile(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save profile.');
      console.error(err);
    }
  };

  const resetToPlaceholder = async () => {
    try {
      setLoading(true);
      const data = await profileService.getProfile();
      if (!data) return;
      // Re-fetch and restore from backend
      const mapped = {
        // Basic Information
        name: data.user?.full_name || INITIAL_FORM.name,
        email: data.user?.email || INITIAL_FORM.email,
        location: data.location || INITIAL_FORM.location,
        college: data.college || INITIAL_FORM.college,
        degree: data.degree || INITIAL_FORM.degree,
        graduationYear: data.graduation_year || INITIAL_FORM.graduationYear,
        branch: data.branch || INITIAL_FORM.branch,
        cgpa: data.cgpa || INITIAL_FORM.cgpa,
        // Career
        careerGoal: data.career_goal || INITIAL_FORM.careerGoal,
        interestedRoles: Array.isArray(data.interested_roles) ? data.interested_roles : INITIAL_FORM.interestedRoles,
        preferredCompanies: Array.isArray(data.preferred_companies) ? data.preferred_companies : INITIAL_FORM.preferredCompanies,
        workPreference: data.work_preference || INITIAL_FORM.workPreference,
        // Skills
        skills: Array.isArray(data.skills) ? data.skills : INITIAL_FORM.skills,
        // Experience
        internships: Array.isArray(data.internships) ? data.internships : INITIAL_FORM.internships,
        projects: Array.isArray(data.projects) ? data.projects : INITIAL_FORM.projects,
        openSource: Array.isArray(data.open_source_contributions) ? data.open_source_contributions : INITIAL_FORM.openSource,
        hackathons: Array.isArray(data.hackathons) ? data.hackathons : INITIAL_FORM.hackathons,
        experienceLevel: data.experience_level || INITIAL_FORM.experienceLevel,
        // About
        about: data.bio || INITIAL_FORM.about,
        // Preferences
        preferredCity: data.preferred_city || INITIAL_FORM.preferredCity,
        preferredCountry: data.preferred_country || INITIAL_FORM.preferredCountry,
        jobType: data.job_type || INITIAL_FORM.jobType,
        internshipOrFullTime: data.internship_or_fulltime || INITIAL_FORM.internshipOrFullTime,
        companyType: data.company_type || INITIAL_FORM.companyType,
        // Privacy
        allowPersonalization: data.allow_personalization !== undefined ? data.allow_personalization : INITIAL_FORM.allowPersonalization,
        allowResumeAnalysis: data.allow_resume_analysis !== undefined ? data.allow_resume_analysis : INITIAL_FORM.allowResumeAnalysis,
      };
      setForm(mapped);
      setSaved(false);
    } catch (err) {
      console.error('Failed to reset profile', err);
    } finally {
      setLoading(false);
    }
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
            <button onClick={handleSave} disabled={loading} className="text-sm px-4 py-2 rounded-md bg-indigo-600 text-white disabled:opacity-60">{loading ? 'Loading...' : 'Save Changes'}</button>
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
                <label className="block text-sm text-slate-600">Email</label>
                <input name="email" value={form.email} readOnly className="mt-1 w-full rounded-md border px-3 py-2 bg-slate-50" />
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

              <div className="text-xs text-slate-400">Changes are saved to the database.</div>
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
              <button onClick={handleSave} disabled={loading} className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-md text-sm disabled:opacity-60">{loading ? 'Saving...' : 'Save'}</button>
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
            <div className="mt-2 text-sm text-slate-600">{saved ? 'Saved to database' : 'Unsaved changes'}</div>
          </div>
        </aside>
      </main>
    </div>
  );
}
