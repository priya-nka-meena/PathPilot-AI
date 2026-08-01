import { useState } from "react";

const SUGGESTED_SKILLS = [
  "Python",
  "Java",
  "C++",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "SQL",
  "Machine Learning",
  "Data Science",
  "AWS",
  "Docker",
  "Git",
  "HTML/CSS",
  "Spring Boot",
  "Flutter",
  "Kubernetes",
  "TensorFlow",
];

function SkillsStep({ data, onToggleSkill, onAddCustomSkill, onRemoveSkill }) {
  const [customInput, setCustomInput] = useState("");

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    onAddCustomSkill(trimmed);
    setCustomInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Skills</h2>
        <p className="mt-1 text-sm text-slate-500">
          Select your skills or add custom ones. This helps our AI tailor recommendations.
        </p>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Suggested skills</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map((skill) => {
            const isSelected = data.skills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => onToggleSkill(skill)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="customSkill" className="block text-sm font-medium text-slate-700">
          Add custom skill
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            id="customSkill"
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
            className="block flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="button"
            onClick={handleAddCustom}
            className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Add
          </button>
        </div>
      </div>

      {data.skills.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium text-slate-700">
            Selected skills ({data.skills.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => onRemoveSkill(skill)}
                  className="rounded-full p-0.5 text-indigo-400 transition-colors hover:bg-indigo-100 hover:text-indigo-700"
                  aria-label={`Remove ${skill}`}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsStep;
