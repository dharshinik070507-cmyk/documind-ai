function InsightCards({ insights }) {
  if (!insights) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Summary</h3>
        <p className="text-slate-300">{insights.summary}</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Confidence Score</h3>
        <p className="text-4xl font-bold text-green-400">
          {Math.round((insights.confidence_score || 0) * 100)}%
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {insights.keywords?.map((word, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Warnings</h3>
        <ul className="space-y-2 text-slate-300">
          {insights.warnings?.length ? (
            insights.warnings.map((warning, index) => (
              <li key={index}>• {warning}</li>
            ))
          ) : (
            <li>No major issues detected.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InsightCards;