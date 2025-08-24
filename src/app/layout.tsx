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
        <meta name="google-adsense-account" content="ca-pub-1048374829701737"/>
        {/* Verifikasi Monetag */}
        <meta name="monetag" content="e7795eae5700719ce0489a0e1d683030" />

        {/* Monetag Inline Script #1 */}
{/*         <Script id="monetag-inline-1" strategy="afterInteractive">
          {`(function(d,z,s){
              s.src='https://'+d+'/401/'+z;
              try{
                (document.body||document.documentElement).appendChild(s)
              }catch(e){}
            })('groleegni.net',9695000,document.createElement('script'));`}
        </Script> */}

        {/* Monetag Inline Script #2 */}
{/*         <Script id="monetag-inline-2" strategy="afterInteractive">
          {`(function(d,z,s){
              s.src='https://'+d+'/401/'+z;
              try{
                (document.body||document.documentElement).appendChild(s)
              }catch(e){}
            })('gizokraijaw.net',9695011,document.createElement('script'));`}
        </Script> */}

        {/* AL5SM Script */}
{/*         <Script id="al5sm" strategy="afterInteractive">
          {`(s=>{
              s.dataset.zone='9694987';
              s.src='https://al5sm.com/tag.min.js';
          })([document.documentElement, document.body].filter(Boolean).pop()
              .appendChild(document.createElement('script')));`}
        </Script> */}

        {/* Adsterra Social Bar */}
{/*         <Script
          src="//brunetteeffaceduring.com/60/83/5b/60835bd5d4447f2da96b90de39b99525.js"
          strategy="afterInteractive"
        /> */}

        {/* Adsterra Popunder */}
{/*         <Script
          src="//brunetteeffaceduring.com/cf/3f/04/cf3f04cbe3364c0d3700e5faf6e388e4.js"
          strategy="afterInteractive"
        />
 */}
        {/* Upskittyan Script */}
{/*         <Script
          src="https://upskittyan.com/act/files/tag.min.js?z=9694990"
          strategy="afterInteractive"
          async
          data-cfasync="false"
        /> */}

        {/* FPYF8 Script */}
{/*         <Script
          src="https://fpyf8.com/88/tag.min.js"
          data-zone="162536"
          async
          data-cfasync="false"
          strategy="afterInteractive"
        /> */}

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
