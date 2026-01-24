const profiles = [
  {
    name: "Listia",
    detail: "Putri dari Bapak Ahmad & Ibu Lina",
  },
  {
    name: "Dedi",
    detail: "Putra dari Bapak Rafi & Ibu Maya",
  },
];

type BrideAndGroomProps = {
  theme?: "light" | "dark";
};

export default function BrideAndGroom({ theme = "light" }: BrideAndGroomProps) {
  const isDark = theme === "dark";

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {profiles.map((profile) => (
        <div
          key={profile.name}
          className={`rounded-2xl border p-6 shadow-lg ${
            isDark
              ? "border-neutral-800 bg-neutral-900/80"
              : "border-amber-100 bg-white"
          }`}
        >
          <div
            className={`h-48 rounded-xl ${
              isDark
                ? "bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950"
                : "bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100"
            }`}
          />
          <div className="mt-5 text-center">
            <h3
              className={`text-xl font-semibold ${
                isDark ? "text-neutral-100" : "text-gray-800"
              }`}
            >
              {profile.name}
            </h3>
            <p className={`mt-2 ${isDark ? "text-neutral-400" : "text-gray-500"}`}>
              {profile.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
