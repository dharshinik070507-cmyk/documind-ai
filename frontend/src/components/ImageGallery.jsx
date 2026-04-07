function ImageGallery({ images }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-4 text-xl font-semibold text-white">Extracted Images</h3>

      {!images || images.length === 0 ? (
        <p className="text-slate-400">No embedded images found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-slate-300"
            >
              <p className="break-all text-sm">{image}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;