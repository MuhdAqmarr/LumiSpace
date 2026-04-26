import type { Metadata } from "next";
import "./globals.css";
import GsapProvider from "@/components/motion/GsapProvider";
import ToastProvider from "@/components/ui/Toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://demo-lumispace.netlify.app"),
  title: "LumiSpace — Premium Venue Booking Marketplace",
  description:
    "Discover cinematic halls, gardens, rooftops, and private spaces from trusted venue providers. Book your perfect event space today.",
  keywords: [
    "venue booking",
    "hall rental",
    "event space",
    "wedding venue",
    "corporate event",
    "Malaysia",
    "KL venue",
  ],
  openGraph: {
    title: "LumiSpace — Premium Venue Booking Marketplace",
    description: "Discover cinematic halls, gardens, rooftops, and private spaces from trusted venue providers across Malaysia.",
    url: "https://demo-lumispace.netlify.app",
    siteName: "LumiSpace",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "LumiSpace — Premium Venue Marketplace",
      },
    ],
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LumiSpace — Premium Venue Booking Marketplace",
    description: "Discover cinematic halls, gardens, rooftops, and private spaces from trusted venue providers across Malaysia.",
    images: ["/opengraph-image.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain-overlay">
        <GsapProvider>
          <ToastProvider>{children}</ToastProvider>
        </GsapProvider>
      </body>
    </html>
  );
}
