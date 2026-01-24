const countdownItems = [
  { label: "Days", value: "120" },
  { label: "Hours", value: "09" },
  { label: "Minutes", value: "32" },
  { label: "Seconds", value: "18" },
];

type DateCountDownProps = {
  theme?: "light" | "dark";
};

export default function DateCountDown({ theme = "light" }: DateCountDownProps) {
  const isDark = theme === "dark";

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {countdownItems.map((item) => (
        <div
          key={item.label}
          className={`rounded-2xl px-4 py-6 text-center shadow-md ${
            isDark
              ? "bg-neutral-900/70 border border-neutral-800"
              : "bg-white/80"
          }`}
        >
          <div
            className={`text-3xl font-semibold ${
              isDark ? "text-neutral-100" : "text-gray-800"
            }`}
          >
            {item.value}
          </div>
          <div
            className={`text-xs uppercase tracking-[0.25em] mt-2 ${
              isDark ? "text-neutral-400" : "text-gray-500"
            }`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
