import ComponentUIGradientImage from "@/components/UI/GradientImage";

const galleryItems = [
  {
    src: "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/08b3e501-mx4_3276-copy.jpg",
    ratio: "portrait",
  },
  {
    src: "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/836bc4e5-mx4_3261.jpg",
    ratio: "landscape",
  },
  {
    src: "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/2a49d380-mx4_3143.jpg",
    ratio: "portrait",
  },
  {
    src: "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/0899fb48-mx4_3022.jpg",
    ratio: "landscape",
  },
  {
    src: "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/9a4474d9-mx4_2980.jpg",
    ratio: "portrait",
  },
  {
    src: "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/42c29673-mx4_2814.jpg",
    ratio: "portrait",
  },
  {
    src: "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/d6bb5714-che04350.jpg",
    ratio: "portrait",
  },
  {
    src: "https://storage.googleapis.com/stateless-swalapatra-com/2023/02/074245a6-che04229.jpg",
    ratio: "portrait",
  },
];

type GalleryProps = {
  theme?: "light" | "dark";
};

export default function Gallery({ theme = "light" }: GalleryProps) {
  const isDark = theme === "dark";

  return (
    <div className="columns-2 gap-3 md:gap-4">
      {galleryItems.map((item) => (
        <div key={item.src} className="mb-3 md:mb-4 break-inside-avoid">
          <div
            className={`overflow-hidden rounded-2xl border shadow-md ${
              item.ratio === "portrait"
                ? "aspect-[2/3]"
                : item.ratio === "landscape"
                  ? "aspect-[4/3]"
                  : "aspect-square"
            } ${isDark ? "border-neutral-800 bg-neutral-900" : "border-gray-200 bg-white"}`}
          >
            <ComponentUIGradientImage
              fitVariant="cover"
              lazy
              unoptimized
              src={item.src}
              alt="Gallery wedding"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
