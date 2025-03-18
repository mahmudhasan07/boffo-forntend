/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import ProductCard from "@/feature/products/card/ProductsCard";
import ProductFilters from "@/feature/products/ProductsFilter";
import { useGetProductsQuery } from "@/redux/api/products/productsApi";
import { useSearchParams } from "next/navigation";

// const products = [
//     {
//         "id": "1",
//         "title": "Product 1",
//         "description": "This is a description of Product 1.",
//         "price": 89.99,
//         "thumbnail": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "images": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7152.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "size": ["32", "36", "40", "44", "48", "52"],
//         "category": "clothing",
//         "color": "Red",
//         "fabric": "Cotton",
//         "sleeve": "Full Sleeve",
//         "style": "Casual"
//     },
//     {
//         "id": "2",
//         "title": "Product 2",
//         "description": "This is a description of Product 2.",
//         "price": 79.99,
//         "thumbnail": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "images": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7152.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "size": ["32", "36", "40", "44", "48", "52"],
//         "category": "clothing",
//         "color": "Blue",
//         "fabric": "Silk",
//         "sleeve": "Half Sleeve",
//         "style": "Formal"
//     },
//     {
//         "id": "3",
//         "title": "Product 3",
//         "description": "This is a description of Product 3.",
//         "price": 129.99,
//         "thumbnail": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "images": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7152.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "size": ["32", "36", "40", "44", "48", "52"],
//         "category": "clothing",
//         "color": "Black",
//         "fabric": "Denim",
//         "sleeve": "Sleeveless",
//         "style": "Traditional"
//     },
//     {
//         "id": "4",
//         "title": "Product 4",
//         "description": "This is a description of Product 4.",
//         "price": 99.99,
//         "thumbnail": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "images": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7152.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "size": ["32", "36", "40", "44", "48", "52"],
//         "category": "clothing",
//         "color": "Green",
//         "fabric": "Linen",
//         "sleeve": "Full Sleeve",
//         "style": "Biker"
//     },
//     {
//         "id": "5",
//         "title": "Product 5",
//         "description": "This is a description of Product 5.",
//         "price": 119.99,
//         "thumbnail": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "images": [
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7152.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7157.jpg?v=1727157514",
//             "https://dorjibari.com.bd/cdn/shop/files/GH7A7160.jpg?v=1727157514"
//         ],
//         "size": ["32", "36", "40", "44", "48", "52"],
//         "category": "clothing",
//         "color": "White",
//         "fabric": "Jacquard",
//         "sleeve": "Half Sleeve",
//         "style": "Regular"
//     }
// ]
function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const feature = searchParams.get("isFeature");
  const filters = [...searchParams.keys()];
  console.log(search);

  const { products2, error, isLoading } = useGetProductsQuery(
    {
      gender: filters[0],
      category: filters[1],
      search: search,
      isFeature: feature,
      limit: 100
    },
    {
      selectFromResult: ({ data, error, isLoading }) => ({
        products2: data?.data,
        error,
        isLoading,
      }),
    }
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredProducts, setFilteredProducts] = useState(products2);
  const [searchQuery, setSearchQuery] = useState("");

  // States for each filter category
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSortBy, setSelectedSortBy] = useState<string | null>(null);

  // State to track active filters
  const isFilterActive = !!(
    searchQuery ||
    selectedColor ||
    selectedSize ||
    selectedPrice ||
    selectedSortBy
  );

  console.log(products2?.data);

  useEffect(() => {
    if (products2) {
      let result = [...products2];

      // Apply search filter
      if (searchQuery) {
        result = result.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply size filter
      if (selectedSize && selectedSize !== "all") {
        result = result.filter((product) =>
          product.size.includes(selectedSize)
        );
      }

      // Apply color filter
      if (selectedColor && selectedColor !== "all") {
        result = result.filter((product) => product.color === selectedColor);
      }

      setFilteredProducts(result);
    }
  }, [products2, searchQuery, selectedSize, selectedColor]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedPrice(null);
    setSelectedSortBy(null);
  };

  return (
    <div className="min-h-screen container mx-auto section-gap">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Collection</h1>
      </header>

      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          {/* Search Bar */}
          <div className="flex sm:flex-row flex-col items-start md:items-center justify-start md:justify-center gap-2 md:gap-4">
            <div className="relative flex-1 max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[1px] focus:ring-primary  sm:text-sm"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* Clear Filters Button */}
            </div>
            <div>
              {isFilterActive && (
                <button
                  className="text-gray-300 hover:underline flex items-center justify-center text-nowrap"
                  onClick={handleClearFilters}
                >
                  <X size={15} />
                  <span> Clear Filters</span>
                </button>
              )}
            </div>
          </div>

          <ProductFilters
            selectedColor={selectedColor}
            selectedPrice={selectedPrice}
            selectedSize={selectedSize}
            selectedSortBy={selectedSortBy}
            setSelectedColor={setSelectedColor}
            setSelectedPrice={setSelectedPrice}
            setSelectedSize={setSelectedSize}
            setSelectedSortBy={setSelectedSortBy}
          />
        </div>
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products2?.length > 0 ? (
          products2?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Product Not Found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
