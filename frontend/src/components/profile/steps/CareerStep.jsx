import FormInput from "../../auth/FormInput";

const EXPERIENCE_LEVELS = [
  "Student / Fresher",
  "0–1 years",
  "1–3 years",
  "3–5 years",
  "5+ years",
];

function CareerStep({ data, errors, onChange, onBlur }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Career Preferences</h2>
        <p className="mt-1 text-sm text-slate-500">
          Help us understand your career direction and goals.
        </p>
      </div>

      <FormInput
        label="Career Goal"
        id="careerGoal"
        name="careerGoal"
        placeholder="e.g. Software Engineer at a product company"
        value={data.careerGoal}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.careerGoal}
      />

      <div>
        <label htmlFor="experienceLevel" className="block text-sm font-medium text-slate-700">
          Experience Level
        </label>
        <select
          id="experienceLevel"
          name="experienceLevel"
          value={data.experienceLevel}
          onChange={onChange}
          onBlur={onBlur}
          className={`mt-1.5 block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            errors.experienceLevel
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
          }`}
        >
          <option value="">Select experience level</option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.experienceLevel && (
          <p className="mt-1.5 text-xs text-red-600">{errors.experienceLevel}</p>
        )}
      </div>

      <FormInput
        label="Preferred Location"
        id="preferredLocation"
        name="preferredLocation"
        placeholder="e.g. Bangalore, Remote, Hyderabad"
        value={data.preferredLocation}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.preferredLocation}
      />
    </div>
  );
}

export default CareerStep;
