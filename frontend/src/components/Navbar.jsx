import { FileText } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-500/20 p-2">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DocuMind AI</h1>
            <p className="text-xs text-slate-400">From documents to decisions</p>
          </div>
        </div>

        <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          Intelligent Document Processing
        </div>
      </div>
    </nav>
  );
}

export default Navbar;