import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Header";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Boffo",
  description: "An E-commerce platform where you find your products",
  metadataBase: new URL("https://boffo-global.com"), // Set correct domain
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
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}

// https://i.ibb.co.com/8nLJ4vB3/image.png