function DocumentPreview({ extractedText, documentType, filename }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">Document Preview</h3>
          <p className="text-sm text-slate-400">{filename}</p>
        </div>

        <span className="rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
          {documentType || "Unknown Document"}
        </span>
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-7 text-slate-300 whitespace-pre-wrap">
        {extractedText || "No extracted text available."}
      </div>
    </div>
  );
}

export default DocumentPreview;