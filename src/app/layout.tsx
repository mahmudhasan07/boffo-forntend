import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/Provider";
import CartDrawer from "@/feature/cart/CartDrawer";
import SmoothScrolling from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";
import FacebookPixel from "@/components/FacebookPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boffo",
  description: "An E-commerce platform where you find your products",
  metadataBase: new URL("https://boffo-global.com"), // Set correct domain
  keywords : ["boffo", "boffo global", "boffo e-commerce"],
  icons: {
    icon: "https://res.cloudinary.com/daudgshta/image/upload/v1742486791/Boffo/logo_nn4hxi.png",
  },
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/daudgshta/image/upload/v1742486812/Boffo/titleImage_jddtvo.png", // Add the logo as the image
        alt: "Boffo Logo", // Optional alt text for the image
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <SmoothScrolling>
          <ReduxProvider>
            <CartDrawer />
            <FacebookPixel /> {/* Add Facebook Pixel component */}
            {children}
            <Toaster />
          </ReduxProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}

// https://i.ibb.co.com/8nLJ4vB3/image.png
