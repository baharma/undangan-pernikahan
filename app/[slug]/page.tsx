import type { Metadata } from "next";
import ComponentContentHome from "@/components/Content/Home";
import { SITE_URL, toAbsoluteUrl } from "@/lib/seo-metadata";

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
  const rawSlug = resolvedParams.slug?.trim() ?? "";
  const guestName = formatGuestNameFromSlug(rawSlug);
  const title = guestName
    ? `Undangan untuk ${guestName} | Pawiwahan Dedi & Listia`
    : "Pawiwahan Dedi & Listia";
  const description = guestName
    ? `Halo ${guestName}, kami mengundang Anda ke Pawiwahan Dedi & Listia.`
    : "Pawiwahan Dedi & Listia";
  const encodedSlug = encodeURIComponent(rawSlug);
  const slugPath = encodedSlug ? `/${encodedSlug}` : "/";
  const canonicalUrl = encodedSlug ? toAbsoluteUrl(slugPath) : SITE_URL;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: "Pawiwahan Dedi & Listia",
      url: canonicalUrl,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page() {
  return <ComponentContentHome />;
}
