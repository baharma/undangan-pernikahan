import ComponentUIGradientImage from "@/components/UI/GradientImage";

const profiles = [
  {
    nickname: "Listia",
    fullName: "Listia Amalia Putri",
    detail:
      "Putri pertama dari pasangan Bapak Ahmad & Ibu Lina, Jakarta.",
    image:
      "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/b063d7f7-mx4_2807-768x1150.jpg",
  },
  {
    nickname: "Dedi",
    fullName: "Dedi Pratama Saputra",
    detail:
      "Putra kedua dari pasangan Bapak Rafi & Ibu Maya, Bandung.",
    image:
      "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/f8e8bcc2-mx4_2823-768x1150.jpg",
  },
];

type BrideAndGroomProps = {
  theme?: "light" | "dark";
};

export default function BrideAndGroom({ theme = "light" }: BrideAndGroomProps) {
  const isDark = theme === "dark";

  return (
    <div className="grid gap-10 md:grid-cols-2">
      {profiles.map((profile) => (
        <div
          key={profile.nickname}
          className={`rounded-3xl border p-6 md:p-8 text-center shadow-lg ${
            isDark
              ? "border-neutral-800 bg-neutral-900/80"
              : "border-amber-100 bg-white"
          }`}
        >
          <div className="mx-auto w-full max-w-[320px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-xl">
              <ComponentUIGradientImage
                fitVariant="cover"
                lazy
                src={profile.image}
                alt={profile.fullName}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-500/80">
              The Bride & Groom
            </p>
            <h3
              className={`text-2xl md:text-3xl font-semibold font-pacifico ${
                isDark ? "text-neutral-100" : "text-gray-800"
              }`}
            >
              {profile.nickname}
            </h3>
            <p
              className={`text-sm md:text-base font-medium ${
                isDark ? "text-neutral-300" : "text-gray-600"
              }`}
            >
              {profile.fullName}
            </p>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-neutral-400" : "text-gray-500"
              }`}
            >
              {profile.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
