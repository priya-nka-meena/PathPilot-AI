function AboutStep({ data, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">About Yourself</h2>
        <p className="mt-1 text-sm text-slate-500">
          Optional — share anything that helps our AI provide better career guidance.
        </p>
      </div>

      <div>
        <label htmlFor="about" className="block text-sm font-medium text-slate-700">
          Tell us about yourself
        </label>
        <textarea
          id="about"
          name="about"
          rows={8}
          value={data.about}
          onChange={onChange}
          placeholder="Tell the AI anything about yourself to receive better personalized career guidance."
          className="mt-1.5 block w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <p className="mt-1.5 text-xs text-slate-400">
          {data.about.length} characters
        </p>
      </div>
    </div>
  );
}

export default AboutStep;
