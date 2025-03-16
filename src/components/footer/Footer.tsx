import Link from "next/link";

const menuItems = [
    { name: "Payments & Delivery", path: "/payment-delivery" },
    // { name: "Shipping & Delivery", path: "/shipping-delivery" },
    { name: "Contact", path: "/contact" },
    { name: "Return & Exchanges", path: "/return-exchanges" }
  ];
  const legalMenuItems = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-conditions" }
  ];

export default function Footer() {
  return (
    <footer className="bg-white ">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* logo  */}
          <div className="space-y-2">
            <p className="text-xl font-semibold">BOFFO</p>
            <p>An E-commerce shop where you find you dream products </p>
          </div>
          {/* Who We Are */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Who We Are
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  News & Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Categories
            </h3>
            <ul className="mt-4 space-y-3">
              {["Panjabi", "T-Shirt", "Shirt"].map((category) => (
                <li key={category}>
                  <Link
                    href={`/products?male&${category.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`${item.path}`}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              More
            </h3>
            <ul className="mt-4 space-y-3">
              {legalMenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={`/${item.path}`}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Terms of Use
              </Link>
              {/* <Link
                href="/offer-terms"
                className="text-sm text-gray-600 hover:text-primary"
              >
                Offer Terms
              </Link> */}
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} boffo All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
