import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CSPostHogProvider } from "./components/PosthogProvider";
import Sidebar from "./components/Sidebar";
import { AppProvider } from "./context/AppContext";
import FloatingButton from "./components/FloatingButton";

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
  description: "Find your next trade target in minutes using data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <AppProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="flex flex-col md:flex-row">
              <Sidebar />
              <main className="flex-1 md:ml-60 p-4">{children}</main>
            </div>
          </body>
          <FloatingButton />
        </AppProvider>
      </CSPostHogProvider>
    </html>
  );
}
