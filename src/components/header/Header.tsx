/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import CartIcon from "@/feature/cart/CartIcon";
import { useFormattedCategories } from "@/hooks/useFormatedCategory";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import image from "@/assets/banner2.jpg";

import logo from "@/assets/logo.png";
import {
  ChevronDown,
  ChevronUp,
  //   Heart,
  LogIn,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { logout } from "@/redux/slice/authSlice";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const route = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const token = Cookies.get("token");
  const dispatch = useDispatch()

  const { data: categories, isLoading } = useFormattedCategories();

  const ref = useRef<any>(null);

  useEffect(() => {

    const tokenDetails = token ? jwtDecode(token as string) : null;

    const currentTime = Math.floor(Date.now() / 1000);
    // Check if the token is expired
    if (tokenDetails != undefined && tokenDetails.exp && tokenDetails.exp > currentTime) {

    } else {
      dispatch(logout())
      Cookies?.remove("token")
    }

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, token]);

  const handleCategoryHover = (category: string | null) => {
    setActiveCategory(category);
  };

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId]
    );
  };
  const user = useSelector((state: RootState) => state.auth);
  console.log(user);

  // if (isLoading) return <p>Loading categories...</p>;
  // if (error) return <p>Error fetching categories.</p>;
  console.log(activeCategory);

  return (
    <header ref={ref} className="border-b relative bg-[#FBEBd2] z-50">
      {/* Top Bar */}
      <div className=" py-2 container">
        <div className="flex items-center justify-between h-16">
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center md:ml-0  ml-8"
          >
            {/* <span className="text-2xl font-bold tracking-wider">BOFFO</span> */}
            <Image src={logo} alt="Logo" className="md:w-32 w-24"></Image>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center md:gap-10 gap-2 md:flex-row flex-col-reverse">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="w-80 px-3 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search
                onClick={() => route.push(`/products?search=${search}`)}
                className="h-5 w-5 text-gray-500 -ml-8"
              />
            </div>

            {/* Icons */}
            {/* <Link
                href={"/favorite"}
                className="text-gray-700 hover:text-primary"
              >
                <Heart className="h-6 w-6" />
              </Link> */}
            <div className="hover:cursor-pointer my-auto mx-auto w-fit">
              <CartIcon />
            </div>
            {user.token ? (
              <Link
                href={"/profile"}
                className="text-gray-700 my-auto hover:text-primary flex gap-2 "
              >
                <User className="h-6 w-6" />
                <span className="my-auto ">Profile</span>
              </Link>
            ) : (
              <Link
                href={"/logIn"}
                className="text-gray-700 my-auto hover:text-primary flex items-center"
              >
                <LogIn size={18} className="mr-2" />
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navigation with Mega Menu */}
      <div className="bg-white border-t">
        <div className="container">
          <div className="hidden md:flex justify-between py-4">
            <div className="flex space-x-8">
              {isLoading
                ? "loading.."
                : categories?.map((category: any) => (
                  <div
                    key={category.id}
                    className="relative "
                    onClick={() => handleCategoryHover(category.id)}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    onMouseLeave={() => handleCategoryHover(null)}
                  >
                    <button className="text-gray-700 hover:text-primary font-medium">
                      {category.name}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <div
        className={cn(
          "absolute top-[120px] left-0 right-0 bg-white border-b shadow-lg transition-all duration-300 ease-in-out",
          activeCategory
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={() => handleCategoryHover(activeCategory)}
        onMouseLeave={() => handleCategoryHover(null)}
      >
        <div className="container py-10">
          <div className="flex">
            {activeCategory &&
              getCategoryContent(
                activeCategory,
                ref,
                handleCategoryHover,
                categories
              )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 flex gap-2">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button
              onClick={() => route.push(`/products?search=${search}`)}
              className="my-auto"
            >
              Search
            </Button>
          </div>
          <nav className="px-4 py-2">
            {categories.map((category: any) => (
              <div
                key={category.id}
                className="border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center justify-between py-3">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="text-gray-900 font-medium text-base text-start flex-1"
                  >
                    {category.name}
                  </button>
                  {category.children.length > 0 && (
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-2 -m-2 text-gray-500"
                    >
                      {expandedCategories.includes(category.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Subcategories */}
                {expandedCategories.includes(category.id) && (
                  <div className="pl-4 pb-3">
                    {category.children.map((subcategory: any) => (
                      <Link
                        key={subcategory.id}
                        href={`/products?${category.slug}&${subcategory.slug}`}
                        className="block py-2 text-gray-600 text-sm hover:text-primary transition-colors"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/sale"
              className="block py-2 text-gray-700 font-semibold"
            >
              SALE
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 font-semibold"
            >
              CONTACTS
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function getCategoryContent(
  categoryId: string,
  ref: any,
  handleCategoryHover: (category: string | null) => void,
  categories: any
) {
  const category = categories.find((c: any) => c.id === categoryId);
  if (!category) return null;

  return (
    <div ref={ref} className="flex items-start justify-center gap-6 relative">
      <div className="absolute -top-8 right-2 z-40 md:hidden">
        <X
          onClick={() => handleCategoryHover(null)}
          className="w-8 text-black cursor-pointer"
        />
      </div>
      <div className="">
        <h3 className="font-bold text-gray-900">{category.name}</h3>
        <ul className="gap-4 mt-2 grid grid-cols-3 ">
          {category.children.map((child: any) => (
            <li key={child.id}>
              <Link
                href={`/products?${category.slug}&${child.slug}`}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {category.featured && (
        <div ref={ref} className="col-span-1">
          <div className=" rounded-lg overflow-hidden relative">
            <Link
              href={`/products?male&panjabi`}
              className="group "
            >
              <img
                src={image.src as string}
                alt={category.featured.title}
                className="w-[300px] h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg">
                  Men Eid Collection
                </h3>
                <Link href={"/products?male&panjabi"} className="text-white text-sm mt-1">Shop Now →</Link>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
