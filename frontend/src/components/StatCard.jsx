function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-lg">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

export default StatCard;