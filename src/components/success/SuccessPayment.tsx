"use client";
import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { clearCart } from "@/feature/cart/CartSlice";

const SuccessPayment = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
        Your Order is Confirmed
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your Order has been processed
          successfully.
        </p>
        <Button className="mt-6" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default SuccessPayment;
