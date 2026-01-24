const galleryItems = ["01", "02", "03", "04", "05", "06"];

type GalleryProps = {
  theme?: "light" | "dark";
};

export default function Gallery({ theme = "light" }: GalleryProps) {
  const isDark = theme === "dark";

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-3 pr-2 snap-x snap-mandatory scrollbar-hide">
        {galleryItems.map((label) => (
          <div
            key={label}
            className={`snap-start shrink-0 w-40 sm:w-48 md:w-56 lg:w-60 aspect-[4/5] rounded-2xl shadow-md flex items-center justify-center text-sm font-semibold ${
              isDark
                ? "bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 text-amber-200"
                : "bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 text-amber-700"
            }`}
          >
            Foto {label}
          </div>
        ))}
      </div>
      <div
        className={`pointer-events-none absolute right-0 top-0 h-full w-10 ${
          isDark
            ? "bg-gradient-to-l from-neutral-950 to-transparent"
            : "bg-gradient-to-l from-white to-transparent"
        }`}
      />
    </div>
  );
}
