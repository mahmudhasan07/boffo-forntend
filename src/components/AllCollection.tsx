"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import panjabiCollection from "@/assets/banner1.jpg";
// import acc from "@/assets/dynamic/ssss(1).jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
function AllCollection() {
  const route = useRouter();
  return (
    <div className="bg-gray-50 container section-gap">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Featured Section */}
        <div className="relative rounded-2xl">
          <Image
            src={panjabiCollection}
            alt="Spring Collection"
            className="w-full h-[600px] object-cover"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h2 className="text-4xl font-serif text-white mb-4">
              The Panjabi
              <br />
              Collection
            </h2>
            <button
              onClick={() => route.push("/products?male&panjabi")}
              className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
            >
              <ShoppingBag size={20} />
              SHOP NOW
            </button>
          </div>
        </div>

        {/* Right Grid Section */}
        <div className="grid grid-cols-2 col-span-2 w-full border-2 gap-4">
          {/* Readers Section */}
          <div className="relative  rounded-2xl">
            <Image
              src="https://i.ibb.co.com/JWvzTsYF/image.png"
              alt="Readers"
              className="w-full h-full object-top object-cover"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <h3 className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
              POLO
            </h3>
          </div>

          {/* Progressives Section */}
          <div className="relative  rounded-2xl">
            <Image
              src="https://i.ibb.co.com/0yM0p9Xx/image.png"
              alt="Progressives"
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <h3 className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
              SHIRT
            </h3>
          </div>

          {/* Accessories Section - Full Width */}
          {/* <div className="relative group overflow-hidden rounded-2xl col-span-full">
            <img
              src={acc.src}
              alt="Accessories"
              className="w-full h-[290px] object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <h3 className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
              ACCESSORIES
            </h3>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AllCollection;
