import type { Metadata } from "next";
import ComponentContentHome from "@/components/Content/Home";

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

function formatGuestNameFromSlug(slug: string) {
  let decodedSlug = slug;

  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    decodedSlug = slug;
  }

  return decodedSlug
    .replace(/[-_+]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const guestName = formatGuestNameFromSlug(resolvedParams.slug);
  const title = guestName
    ? `Undangan untuk ${guestName} | Pawiwahan Dedi & Listya`
    : "Pawiwahan Dedi & Listya";
  const description = guestName
    ? `Halo ${guestName}, kami mengundang Anda ke Pawiwahan Dedi & Listya.`
    : "Pawiwahan Dedi & Listya";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `/${resolvedParams.slug}`,
      title,
      description,
      images: [
        {
          url: "/image/MRX09363.jpg",
          width: 5616,
          height: 3744,
          alt: "Undangan Pawiwahan Dedi & Listya",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/image/MRX09363.jpg"],
    },
  };
}

export default function Page() {
  return <ComponentContentHome />;
}
