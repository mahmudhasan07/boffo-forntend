/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import { Package, Truck, RotateCcw, Calendar, Clock } from "lucide-react";
import { useGetMyOrdersQuery } from "@/redux/api/order/orderApi";
import Image from "next/image";

const getStatusIcon = (status: string) => {
  if (status === "Delivered") return <Package size={16} className="mr-1" />;
  if (status === "In Transit") return <Truck size={16} className="mr-1" />;
  return <RotateCcw size={16} className="mr-1" />;
};

const getStatusClass = (status: string) => {
  if (status === "Delivered") return "bg-emerald-100 text-emerald-800";
  if (status === "In Transit") return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800";
};

const OrderStatus = () => {
  const { data, error, isLoading } = useGetMyOrdersQuery("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;
  const orderItems = data?.data;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Orders</h2>

      <div className="space-y-6">
        {orderItems.map((order: any) => (
          <div
            key={order.id}
            className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="text-gray-700">
                <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <span className="font-medium">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </p>
              </div>
              <span
                className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${getStatusClass(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                {order.status}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              {order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 border">
                      <Image
                        src={`https://boffo-backend.onrender.com/uploads/${item.productDetails.thumbnailImage}`}
                        alt={item.productDetails.name || "images"}
                        width={500}
                        height={500}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">
                        {item.productDetails.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        ${item.price} each
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-semibold text-gray-900">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>
                  Ordered: {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                {order.status === "Delivered" && (
                  <span>
                    Delivered: {new Date(order.updatedAt).toLocaleDateString()}
                  </span>
                )}
                {order.status === "In Transit" && (
                  <span>
                    Est. Delivery:{" "}
                    {new Date(order.updatedAt).toLocaleDateString()}
                  </span>
                )}
                {order.status === "Returned" && (
                  <span>
                    Returned: {new Date(order.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
