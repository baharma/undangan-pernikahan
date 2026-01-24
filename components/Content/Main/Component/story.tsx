const storyItems = [
  {
    title: "Pertemuan Pertama",
    date: "2019",
    description:
      "Kami bertemu di sebuah acara keluarga dan menemukan banyak kesamaan.",
  },
  {
    title: "Komitmen",
    date: "2022",
    description: "Seiring waktu, kami memutuskan untuk melangkah bersama.",
  },
  {
    title: "Hari Bahagia",
    date: "2026",
    description: "Kini kami siap memulai perjalanan baru dalam ikatan suci.",
  },
];

type StoryProps = {
  theme?: "light" | "dark";
};

export default function Story({ theme = "light" }: StoryProps) {
  const isDark = theme === "dark";

  return (
    <div className="relative">
      <div
        className={`absolute left-5 top-3 h-full w-px ${
          isDark ? "bg-neutral-800" : "bg-gray-200"
        }`}
      />
      <div className="space-y-8 pl-12">
        {storyItems.map((item, index) => (
          <div key={item.title} className="relative">
            <div
              className={`absolute -left-7 top-3 h-4 w-4 rounded-full border-2 ${
                isDark
                  ? "border-amber-300 bg-neutral-950"
                  : "border-amber-500 bg-white"
              }`}
            />
            <div
              className={`rounded-2xl border p-6 shadow-md ${
                isDark
                  ? "border-neutral-800 bg-neutral-900/80"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div
                className={`mb-3 h-1 w-14 rounded-full ${
                  isDark
                    ? "bg-gradient-to-r from-amber-300 via-rose-300 to-orange-300"
                    : "bg-gradient-to-r from-amber-400 via-rose-400 to-orange-400"
                }`}
              />
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                    isDark ? "text-amber-300/80" : "text-amber-600/80"
                  }`}
                >
                  Chapter {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-xs rounded-full px-2 py-0.5 ${
                    isDark
                      ? "bg-amber-400/10 text-amber-200"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.date}
                </span>
              </div>
              <h4
                className={`mt-3 text-xl font-semibold ${
                  isDark ? "text-neutral-100" : "text-gray-800"
                }`}
              >
                {item.title}
              </h4>
              <p className={`mt-2 ${isDark ? "text-neutral-400" : "text-gray-600"}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
