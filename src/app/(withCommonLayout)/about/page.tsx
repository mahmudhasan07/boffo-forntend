import Image from "next/image";
import image from "@/assets/title.jpg";
export default function Page() {
  return (
    <div className="my-8 space-y-5 max-w-3xl mx-auto">
      <h1 className="md:text-3xl text-xl font-bold text-center">About Us</h1>
      <Image src={image} alt="Logo" width={400} height={500} className="mx-auto"></Image>
      <p className=" mx-auto text-center md:text-lg">Our brand offers high-quality men&apos;s T-shirts, sweatshirts, denim pants, joggers, and other winter wear. We combine trendy styles with comfortable clothing to enhance your daily life. Our products feature the latest designs and fabrics for every season, blending innovation with fashion.</p>
    </div>
  );
}
