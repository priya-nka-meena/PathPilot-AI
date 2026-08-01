import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProgressIndicator from "../components/profile/ProgressIndicator";
import BasicInfoStep from "../components/profile/steps/BasicInfoStep";
import CareerStep from "../components/profile/steps/CareerStep";
import SkillsStep from "../components/profile/steps/SkillsStep";
import ResumeStep from "../components/profile/steps/ResumeStep";
import AboutStep from "../components/profile/steps/AboutStep";

const TOTAL_STEPS = 5;

const INITIAL_FORM = {
  name: "",
  college: "",
  degree: "",
  graduationYear: "",
  careerGoal: "",
  experienceLevel: "",
  preferredLocation: "",
  skills: [],
  resume: null,
  about: "",
};

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

function ProfileSetupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isCompleting, setIsCompleting] = useState(false);

  const currentYear = new Date().getFullYear();

  const validateStep = (step, data) => {
    const stepErrors = {};

    if (step === 1) {
      if (!data.name.trim()) stepErrors.name = "Name is required";
      if (!data.college.trim()) stepErrors.college = "College is required";
      if (!data.degree.trim()) stepErrors.degree = "Degree is required";
      if (!data.graduationYear) {
        stepErrors.graduationYear = "Graduation year is required";
      } else {
        const year = Number(data.graduationYear);
        if (Number.isNaN(year) || year < currentYear - 10 || year > currentYear + 6) {
          stepErrors.graduationYear = `Enter a year between ${currentYear - 10} and ${currentYear + 6}`;
        }
      }
    }

    if (step === 2) {
      if (!data.careerGoal.trim()) stepErrors.careerGoal = "Career goal is required";
      if (!data.experienceLevel) stepErrors.experienceLevel = "Experience level is required";
      if (!data.preferredLocation.trim()) {
        stepErrors.preferredLocation = "Preferred location is required";
      }
    }

    return stepErrors;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFieldBlur = (e) => {
    const { name } = e.target;
    const stepErrors = validateStep(currentStep, formData);
    if (stepErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: stepErrors[name] }));
    }
  };

  const handleToggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleAddCustomSkill = (skill) => {
    setFormData((prev) => {
      if (prev.skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
        return prev;
      }
      return { ...prev, skills: [...prev.skills, skill] };
    });
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleFileSelect = (file) => {
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleFileRemove = () => {
    setFormData((prev) => ({ ...prev, resume: null }));
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) return;

    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handlePrevious = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      console.log("Profile setup data:", formData);
      setIsCompleting(false);
      navigate("/");
    }, 500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            data={formData}
            errors={errors}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />
        );
      case 2:
        return (
          <CareerStep
            data={formData}
            errors={errors}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />
        );
      case 3:
        return (
          <SkillsStep
            data={formData}
            onToggleSkill={handleToggleSkill}
            onAddCustomSkill={handleAddCustomSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        );
      case 4:
        return (
          <ResumeStep
            data={formData}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
          />
        );
      case 5:
        return <AboutStep data={formData} onChange={handleFieldChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/80 to-white">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-semibold text-slate-900">PathPilot-AI</span>
          </Link>
          <span className="text-xs font-medium text-slate-400">Profile Setup</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Set up your profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Complete these steps to unlock personalized career guidance.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          <div className="min-h-[320px]">{renderStep()}</div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                disabled={isCompleting}
                className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCompleting ? "Completing..." : "Complete Setup"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileSetupPage;
