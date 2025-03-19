/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/redux/store";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../cart/CartSlice";
import Link from "next/link";
import Image from "next/image";
import {
  useCashPaymentMutation,
  useMakePaymentMutation,
} from "@/redux/api/payment/paymentApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [paymentFn] = useMakePaymentMutation();
  const [cashPayment] = useCashPaymentMutation();
  const [paymentType, setPaymentType] = useState<string>("");
  const [payment, setPayment] = useState<string>("Click to order");
  const { cart } = useSelector((state: RootState) => state.cart);
  // const { email: userEmail } = useSelector((state: RootState) => state.auth);
  const route = useRouter();

  const user = useSelector((state: RootState) => state.auth);

  const decodedToken = user.token
    ? jwtDecode<{ id: string }>(user.token)
    : null;
  const id = decodedToken ? decodedToken.id : null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: string, size: string) => {
    dispatch(removeFromCart({ id, size }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setPayment("loading");
    if (paymentType == "Online Payment") {
      toast.loading("wait for some while, payment is processing");
    }
    e.preventDefault();
    // Implement checkout submission logic (e.g., API call, payment integration)

    const value = new FormData(e.currentTarget as HTMLFormElement);
    const name = `${value.get("firstName")} ${value.get("lastName")}`;
    const email = value.get("email");
    const address = value.get("address");
    const city = value.get("city");
    const postCode = value.get("postalCode");
    const phone = value.get("phone");
    const thana = value.get("thana");

    const info = { name, email, phone, address, city, thana, postCode };

    const items = cart?.map((product) => {
      return {
        productId: product?.id,
        quantity: product.quantity,
        size: product?.size,
        price: product?.price,
      };
    });

    const body = { info, items, totalPrice: subtotal, paymentType, id };

    if (paymentType == "Online Payment") {
      const { error, data } = await paymentFn(body);
      if (error) {
        toast.error("Unable to make payment, try again");
        toast.success("Product Successfully purchased");
        return;
      }

      route.push(data?.data?.redirectLink);
    } else {
      const { error } = await cashPayment(body);
      if (error) {
        toast.error("Unable to make payment, try again");
        return;
      }
      toast.dismiss("Your order is confirmed");
      setPayment("Click to order");
      route.push("/success");

      // toast.warning("Please login first for purchase");
    }

    // route.push("/success");
    // handleClearCart();

    // console.log(info);
  };

  console.log(paymentType.length);

  return (
    <div className="container section-gap">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      {cart.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8 ">
          <div className="space-y-6  flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              {cart.map((item: any) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="relative aspect-square h-20 w-20 overflow-hidden rounded-md">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    {item.size && (
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="font-medium mt-1">tk.{item.price.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id, item.size)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Total items</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">tk.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>tk.{subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold mb-3">Select your payment method</h1>
              <div className="space-x-2">
                <input
                  onChange={() => setPaymentType("CashIn")}
                  type="radio"
                  name="paymentType"
                  className="text-xl"
                />
                <span>Cash On Delivery</span>
              </div>
              <div className="space-x-2">
                <input
                  onChange={() => setPaymentType("Online Payment")}
                  type="radio"
                  name="paymentType"
                  disabled
                  className="text-xl"
                />
                <span>Online Payment</span>
              </div>

              <div>
                {
                  user?.email ?
                  ""
                  :
                  <span className="text-red-600 text-sm">If you don&apos;t log in and purchase products as a guest user, there will be no order history. Only the admin sees that information and he will contact you.</span>
                }
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName">Name</label>
                  <Input
                    defaultValue={user?.name ?? ""}
                    className="px-1"
                    id="firstName"
                    name="firstName"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="address">Address</label>
                <Input
                  className="px-1"
                  id="address"
                  name="address"
                  placeholder=""
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="city">City</label>
                  <Input
                    className="px-1"
                    id="city"
                    name="city"
                    placeholder=""
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="postalCode">Postal Code</label>
                  <Input
                    className="px-1"
                    id="postalCode"
                    name="postalCode"
                    placeholder=""
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="postalCode">Thana</label>
                  <Input
                    className="px-1"
                    id="thana"
                    name="thana"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email">Email</label>
                <Input
                  className="px-1"
                  type="email"
                  id="email"
                  name="email"
                  placeholder=""
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone">
                  Phone ( use whatsapp number for faster delivery)
                </label>
                <Input
                  className="px-1"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder=""
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={
                  cart.length === 0 ||
                  paymentType.length <= 0 ||
                  payment == "loading"
                }
              >
                {payment}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 bg-primary/5 lg:py-40 py-20 rounded-lg">
          <ShoppingBag className="h-16 w-16 text-gray-400" aria-hidden="true" />
          <p className="text-xl font-medium text-gray-600">
            Your cart is empty
          </p>
          <Link
            href={"/products"}
            className="mt-6 border p-2 rounded-lg bg-primary text-white"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
