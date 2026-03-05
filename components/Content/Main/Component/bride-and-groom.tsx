import ComponentUIGradientImage from "@/components/UI/GradientImage";

const profiles = [
  {
    nickname: "Listia",
    fullName: "-",
    detail:
      "Putri dari pasangan Bapak Ketut sukrayasa & Ibu Nyoman siartini.",
    image:
      "/image/MRX09403.jpg",
    imageClassName: "scale-150 object-top",
  },
  {
    nickname: "Dedi",
    fullName: "-",
    detail:
      "Putra dari pasangan Bapak I ketut Jaya Nur jaya & Ibu Nurjaya.",
    image:
      "/image/Screenshot 2026-03-04 at 00.40.52.png",
    imageClassName: "",
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
                className={profile.imageClassName}
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
