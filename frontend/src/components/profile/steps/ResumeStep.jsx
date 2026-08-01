import { useRef, useState } from "react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx";

function ResumeStep({ data, onFileSelect, onFileRemove }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");

  const validateFile = (file) => {
    if (!file) return "No file selected";

    const isValidType =
      ACCEPTED_TYPES.includes(file.type) ||
      file.name.endsWith(".pdf") ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx");

    if (!isValidType) {
      return "Please upload a PDF or Word document";
    }

    if (file.size > 5 * 1024 * 1024) {
      return "File size must be under 5 MB";
    }

    return "";
  };

  const handleFile = (file) => {
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      return;
    }
    setFileError("");
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Upload Resume</h2>
        <p className="mt-1 text-sm text-slate-500">
          Optional — upload your resume for deeper AI analysis of your experience and skills.
        </p>
      </div>

      {!data.resume ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 transition-all ${
            isDragging
              ? "border-indigo-400 bg-indigo-50/50"
              : "border-slate-200 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30"
          }`}
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
            <svg
              className="h-7 w-7 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700">
            Drag & drop your resume here
          </p>
          <p className="mt-1 text-xs text-slate-400">or click to browse files</p>
          <p className="mt-3 text-xs text-slate-400">PDF, DOC, DOCX — max 5 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{data.resume.name}</p>
              <p className="text-xs text-slate-400">
                {(data.resume.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onFileRemove}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      )}

      {fileError && <p className="text-xs text-red-600">{fileError}</p>}

      <p className="text-xs text-slate-400">
        You can skip this step and upload your resume later from your dashboard.
      </p>
    </div>
  );
}

export default ResumeStep;
