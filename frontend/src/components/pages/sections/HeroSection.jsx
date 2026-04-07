function HeroSection() {
  return (
    <div className="mx-auto max-w-5xl text-center">
      <div className="mb-6 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
        AI-powered document extraction, structuring and intelligence
      </div>

      <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
        Transform Documents into
        <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
          {" "}Smart Data
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
        DocuMind AI processes PDFs and images, extracts text, tables, and images,
        structures them into useful formats, and adds intelligent insights for
        faster decision-making.
      </p>
    </div>
  );
}

export default HeroSection;