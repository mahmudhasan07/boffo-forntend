/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState } from "@/redux/store";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  toggleDrawer,
} from "./CartSlice";
import { useRouter } from "next/navigation";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isOpen, cart } = useSelector((state: RootState) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: string, size: string) => {
    dispatch(removeFromCart({ id, size }));
  };

  const handleIncreaseQuantity = (id: string, size: string) => {
    dispatch(increaseQuantity({ id, size }));
  };

  const handleDecreaseQuantity = (id: string, size: string) => {
    dispatch(decreaseQuantity({ id, size }));
  };

  const router = useRouter();
  const handleCheckout = (items: any) => {
    // Implement checkout logic here
    router.push("/checkOut");
    dispatch(toggleDrawer());
    console.log("Proceeding to checkout with items:", items);
  };

  console.log(cart);

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(toggleDrawer())}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg min-h-screen">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between py-2 md:h-full">
          <div className=" pr-6 my-4">
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item: any) => (
                  <div key={`${item.id}-${item.size}`} className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="line-clamp-1 text-sm font-medium">
                            {item.title}
                          </span>
                          {item.size && (
                            <span className="text-xs text-muted-foreground">
                              Size: {item.size}
                            </span>
                          )}
                          <span className="line-clamp-1 text-sm font-medium">
                            {item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveItem(item.id, item.size)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleDecreaseQuantity(item.id, item.size)
                            }
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleIncreaseQuantity(item.id, item.size)
                            }
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex  h-[calc(100vh-4.5rem)]  flex-col items-center justify-center space-y-2">
                <ShoppingBag
                  className="h-12 w-12 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-lg font-medium text-muted-foreground">
                  Your cart is empty
                </span>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm font-medium">Free</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="w-full py-2 border rounded-lg bg-black text-white hover:bg-primary"
                onClick={() => handleCheckout(cart)}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
