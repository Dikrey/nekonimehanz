import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import ProviderLayout from "./provider";
import { Inter } from "next/font/google";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Animenekohanz",
  description: "Build by Raihan_official0307",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
         {/* Adsterra Social Bar */}
        <Script
          src="//brunetteeffaceduring.com/60/83/5b/60835bd5d4447f2da96b90de39b99525.js"
          strategy="afterInteractive"
        />
        {/* Adsterra Popunder */}
        <Script
          src="//brunetteeffaceduring.com/cf/3f/04/cf3f04cbe3364c0d3700e5faf6e388e4.js"
          strategy="afterInteractive"
        />
        {/* Script Iklan AdSense Global */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1048374829701737"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontInter.className
        )}
      >
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
