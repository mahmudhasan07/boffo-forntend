export default function PaymentsDelivery() {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Payments & Delivery</h1>
  
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Delivery Information</h2>
          <p className="text-gray-700 text-sm sm:text-base">We are pleased to offer <span className="font-bold">FREE delivery</span> across <span className="font-bold">Bangladesh</span>! No matter where you are, we’ll get your order to you without any extra charges.</p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700 text-sm sm:text-base">
            <li><span className="font-semibold">Delivery Time:</span> Orders are typically delivered within <span className="font-bold">2-5 business days</span>, depending on your location.</li>
            <li><span className="font-semibold">Delivery Areas:</span> We deliver nationwide, including Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Barishal, Rangpur, and Mymensingh.</li>
            <li><span className="font-semibold">Order Tracking:</span> Once your order is dispatched, you will receive a tracking update via SMS or email.</li>
          </ul>
        </section>
  
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Payment Methods</h2>
          <p className="text-gray-700 text-sm sm:text-base">For your convenience, we offer <span className="font-bold">Cash on Delivery (COD)</span>, allowing you to pay when you receive your order.</p>
          <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700 text-sm sm:text-base">
            <li><span className="font-semibold">Cash on Delivery (COD):</span> Pay in cash directly to the delivery person upon receiving your order.</li>
            <li><span className="font-semibold">Other Payment Methods (Coming Soon!):</span> We are working on adding online payment options for even more flexibility.</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Need Help?</h2>
          <p className="text-gray-700 text-sm sm:text-base">If you have any questions about your order or need assistance, feel free to contact us:</p>
          <div className="mt-3 p-4 bg-gray-100 rounded-lg text-sm sm:text-base">
            <p className="text-gray-700"><span className="font-semibold">📞 Customer Support:</span>
            01327-195160</p>
            <p className="text-gray-700"><span className="font-semibold">📧 Email:</span>boffo.brand.01@gmail.com</p>
          </div>
        </section>
      </div>
    );
  }
  