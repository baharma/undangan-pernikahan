import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

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

const DEFAULT_SITE_URL = "https://pawiwahan-dedi-Listia.my.id";
const OG_IMAGE_PATH = "/og-whatsapp.jpg";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(
  /\/$/,
  "",
);

const metadataBase = (() => {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: "Pawiwahan Dedi & Listia",
  description: "Pawiwahan Dedi & Listia",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Pawiwahan Dedi & Listia",
    description: "Pawiwahan Dedi & Listia",
    siteName: "Pawiwahan Dedi & Listia",
    images: [
      {
        url: OG_IMAGE_PATH,
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
    images: [OG_IMAGE_PATH],
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
