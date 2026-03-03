import ComponentUIGradientImage from "@/components/UI/GradientImage";

const galleryItems = [
  {
    src: "/image/MRX09221.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09232.jpg",
    ratio: "landscape",
  },
  {
    src: "/image/MRX09252.jpg",
    ratio: "landscape",
  },
  {
    src: "/image/MRX09245.jpg",
    ratio: "landscape",
  },
  {
    src: "/image/MRX09417.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09433.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09457.jpg",
    ratio: "portrait",
  },
  {
    src: "/image/MRX09474.jpg",
    ratio: "landscape",
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
