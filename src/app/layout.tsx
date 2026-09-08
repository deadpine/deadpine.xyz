import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono, Inter, Noto_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const siteUrl = "https://deadpine.xyz";
const description =
  "Seeking beauty and untangling complexity.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "deadpine.xyz",
    template: "%s · deadpine.xyz",
  },
  description,
  applicationName: "deadpine.xyz",
  authors: [{ name: "Deadpine", url: siteUrl }],
  creator: "Deadpine",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "deadpine.xyz",
    description,
    siteName: "deadpine.xyz",
    images: [
      {
        url: "/img/twitter.jpg",
        width: 1200,
        height: 630,
        alt: "deadpine.xyz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deadpine's portfolio",
    description: "Product Design & Brand Identity",
    creator: "@deadpine_xyz",
    images: ["/img/twitter.jpg"],
  },
  icons: {
    icon: [
      { url: "/img/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/img/favicon/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
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
        className={`${inter.variable} ${notoSerif.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3G7E5SVXS2"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3G7E5SVXS2');
          `}
        </Script>
      </body>
    </html>
  );
}
