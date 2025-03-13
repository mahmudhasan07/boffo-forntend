"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function ProductFilters({ selectedColor, setSelectedColor, selectedSize, setSelectedSize, selectedPrice, setSelectedPrice, selectedSortBy, setSelectedSortBy }: {
    selectedColor: string | null, setSelectedColor: Dispatch<SetStateAction<string | null>>, selectedSize: string | null, setSelectedSize: Dispatch<SetStateAction<string | null>>, selectedPrice: string | null, setSelectedPrice: Dispatch<SetStateAction<string | null>>, selectedSortBy: string | null, setSelectedSortBy: Dispatch<SetStateAction<string | null>>
}) {
    const [activeFilter, setActiveFilter] = useState<string | null>(null)



    const filters = {
        sortBy: ["Newest", "Price: Low to High", "Price: High to Low"],
        price: ["Under ৳1000", "৳1000 - ৳5000", "৳5000 - ৳10000", "Over ৳10000"],
        color: ["Black", "White", "Gold", "Silver", "Rose Gold"],
        size: ["XS", "S", "M", "L", "XL"],
    }

    const toggleFilter = (filterName: string) => {
        setActiveFilter(activeFilter === filterName ? null : filterName)
    }

    // Handle option selection for each filter
    const handleOptionClick = (filterName: string, option: string) => {
        if (filterName === "color") setSelectedColor(option)
        if (filterName === "size") setSelectedSize(option)
        if (filterName === "price") setSelectedPrice(option)
        if (filterName === "sortBy") setSelectedSortBy(option)
    }

    return (
        <div className="relative border-b border-gray-200">
            <div className="flex sm:space-x-8 space-x-4 px-4 py-4">
                {Object.entries(filters).map(([filterName, options]) => (
                    <div key={filterName} className="relative">
                        <button
                            onClick={() => toggleFilter(filterName)}
                            className="group flex items-center space-x-2 uppercase text-sm font-medium tracking-wider hover:text-gray-600 transition-colors"
                        >
                            <span>{filterName}</span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${activeFilter === filterName ? "rotate-180" : ""}`}
                            />
                        </button>

                        {activeFilter === filterName && (
                            <div className="absolute left-0 top-full z-10 mt-2 w-fit lg:w-48 border bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                    {options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionClick(filterName, option)} // Handle option click
                                            className={`block text-nowrap w-full px-2 sm:px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${(filterName === "color" && selectedColor === option) ||
                                                (filterName === "size" && selectedSize === option) ||
                                                (filterName === "price" && selectedPrice === option) ||
                                                (filterName === "sortBy" && selectedSortBy === option)
                                                ? "bg-gray-200 text-gray-900"
                                                : ""
                                                }`} // Highlight selected option
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
