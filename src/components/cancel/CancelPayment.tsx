"use client"
import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';

const CancelPayment = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <XCircle className="text-red-500 w-16 h-16 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Payment Canceled
          </h1>
          <p className="text-gray-600 mt-2">
            Your payment was not processed. If you have any questions, please contact support.
          </p>
          <Button className="mt-6" onClick={() => router.push("/")}>Go to Home</Button>
        </div>
      </div>
    );
};

export default CancelPayment;