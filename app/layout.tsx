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

const siteUrl = "https://pawiwahan-dedi-listya.my.id/" ;

const metadataBase = (() => {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: "Pawiwahan Dedi & Listya",
  description: "Pawiwahan Dedi & Listya",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Pawiwahan Dedi & Listya",
    description: "Pawiwahan Dedi & Listya",
    siteName: "Pawiwahan Dedi & Listya",
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
    title: "Pawiwahan Dedi & Listya",
    description: "Pawiwahan Dedi & Listya",
    images: ["/image/MRX09363.jpg"],
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
