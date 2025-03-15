/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import ProductCard from "./card/ProductsCard";
import Link from "next/link";
import { useGetProductsQuery } from "@/redux/api/products/productsApi";

const NewArrival = () => {
  const { products2, error, isLoading } = useGetProductsQuery(
    { isFeature: true },
    {
      selectFromResult: ({ data, error, isLoading }) => ({
        products2: data?.data,
        error,
        isLoading,
      }),
    }
  );

  return (
    <div className="container section-gap"> 
      <div className="">
        <div className="flex flex-row items-center justify-between mb-12">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              New Arrival
            </h2>
            <div className="h-1 w-20 bg-gray-900 rounded" />
          </div>
          <Link
            href={"/products?isFeature=true"}
            className="inline-flex items-center sm:px-6 px-3 py-2 sm:py-3 border border-gray-900 text-base font-medium rounded-full text-gray-900 bg-transparent hover:bg-primary hover:border-primary hover:text-white transition-colors duration-200 "
          >
            View All Collections
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-700">
              Loading products...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-red-600">
              Failed to load products. Please try again later.
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
            {products2?.length > 0 ? (
              products2?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-4 text-center text-lg font-semibold text-gray-700">
                No products available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrival;
