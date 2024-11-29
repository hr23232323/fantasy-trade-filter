import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CSPostHogProvider } from "./components/PosthogProvider";
import Sidebar from "./components/Sidebar";
import { AppProvider } from "./context/AppContext";
import FloatingButton from "./components/FloatingButton";
import Head from "next/head";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fantasy Trade Targets",
  description: "Find your next trade target and generate memes.",
  openGraph: {
    title: "Fantasy Trade Targets",
    description: "Find your next trade target and generate memes.",
    url: "https://www.fantasytradetarget.com",
    siteName: "Fantasy Trade Targets",
    images: [
      {
        url: "https://www.fantasytradetarget.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fantasy Trade Targets Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fantasy Trade Targets",
    description: "Find your next trade target and generate memes.",
    images: ["https://www.fantasytradetarget.com/og-image.png"],
  },
  alternates: {
    canonical: "https://www.fantasytradetarget.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Fantasy Trade Targets",
              url: "https://www.fantasytradetarget.com",
              description: "Find your next trade target and generate memes.",
              applicationCategory: "Game",
            }),
          }}
        />
        {/* Preload Fonts */}
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.fantasytradetarget.com" />
      </Head>
      <CSPostHogProvider>
        <AppProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
          >
            <div className="flex flex-col md:flex-row flex-1">
              {/* Sidebar as a semantic navigation element */}
              <Sidebar />
              <main className="flex-1 p-4 ml-0">{children}</main>
            </div>
            <Footer />
            <FloatingButton />
          </body>
        </AppProvider>
      </CSPostHogProvider>
    </html>
  );
}
