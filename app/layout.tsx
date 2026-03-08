import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { METADATA_BASE, OG_IMAGE_URL, SITE_URL } from "@/lib/seo-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  alternates: {
    canonical: SITE_URL,
  },
  title: "Pawiwahan Dedi & Listia",
  description: "Pawiwahan Dedi & Listia",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    title: "Pawiwahan Dedi & Listia",
    description: "Pawiwahan Dedi & Listia",
    siteName: "Pawiwahan Dedi & Listia",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 800,
        type: "image/jpeg",
        alt: "Undangan Pawiwahan Dedi & Listia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawiwahan Dedi & Listia",
    description: "Pawiwahan Dedi & Listia",
    images: [OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
