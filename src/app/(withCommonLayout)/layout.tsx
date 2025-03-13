import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Header";


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