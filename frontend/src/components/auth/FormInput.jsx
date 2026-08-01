function FormInput({
  label,
  id,
  type = "text",
  error,
  hint,
  className = "",
  ...props
}) {
  const inputClasses = [
    "mt-1.5 block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20",
    className,
  ].join(" ");

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input id={id} type={type} className={inputClasses} {...props} />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      {!error && hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export default FormInput;
