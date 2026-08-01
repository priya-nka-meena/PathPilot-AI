import FormInput from "../../auth/FormInput";

const currentYear = new Date().getFullYear();

function BasicInfoStep({ data, errors, onChange, onBlur }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
        <p className="mt-1 text-sm text-slate-500">
          Tell us about your academic background.
        </p>
      </div>

      <FormInput
        label="Name"
        id="name"
        name="name"
        placeholder="Your full name"
        value={data.name}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.name}
      />

      <FormInput
        label="College"
        id="college"
        name="college"
        placeholder="Your college or university"
        value={data.college}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.college}
      />

      <FormInput
        label="Degree"
        id="degree"
        name="degree"
        placeholder="e.g. B.Tech in Computer Science"
        value={data.degree}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.degree}
      />

      <FormInput
        label="Graduation Year"
        id="graduationYear"
        name="graduationYear"
        type="number"
        min={currentYear - 10}
        max={currentYear + 6}
        placeholder={String(currentYear)}
        value={data.graduationYear}
        onChange={onChange}
        onBlur={onBlur}
        error={errors.graduationYear}
      />
    </div>
  );
}

export default BasicInfoStep;
