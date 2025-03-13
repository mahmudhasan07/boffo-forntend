"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Eye, Heart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

type Product = {
    id: string;
    name: string; // Changed from 'title' to 'name' to match the API response
    description: string;
    price: number;
    thumbnailImage: string;
    productImages: string[]; // Changed from 'images' to 'productImages' to match API
    size: string[];
    category: string;
    color: string;
    discount: number;
    status: string;
    gender: string;
    isFeature: boolean;
    createdAt: string;
    updatedAt: string;
};


interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useRouter();
    // const dispatch = useDispatch();
    const handleDetails = (event: React.MouseEvent, id: string) => {
        if (ref.current && ref.current.contains(event.target as Node)) {
            return; // Prevent triggering if clicking inside ref
        }
        navigate.push(`/products/${id}`); // Redirect to the product details page
    };

    const handleCart = async (id: string) => {
        navigate.push(`/products/${id}`);
    };

    return (
        <div onClick={(event) => handleDetails(event, product.id)}>
            <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-sm transition-all duration-300" >
                    {/* First Image */}
                    <Image
                        src={product.thumbnailImage}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out"
                        style={{ opacity: isHovered ? 0 : 1 }}
                    />
                    {/* Second Image */}
                    <Image
                        src={product?.productImages[0]}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out"
                        style={{ opacity: isHovered ? 1 : 0 }}
                    />


                    {/* Icon Buttons */}
                    <div
                        ref={ref}
                        className={cn(
                            "absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 transition-all duration-300",
                            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                        )}
                    >
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-10 w-10 rounded-full bg-white hover:bg-primary hover:text-white transition-colors"
                            onClick={() => setShowModal(true)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-10 w-10 rounded-full bg-white hover:bg-primary hover:text-white transition-colors"
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-lg font-semibold">BDT {product.price.toFixed(2)} TK</p>
                </div>
            </div>

            {/* Quick View Modal */}
            <Dialog

                open={showModal} onOpenChange={setShowModal}>
                <DialogContent ref={ref} className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Quick View</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 md:grid-cols-2">
                        <div className="relative aspect-square">
                            <Image
                                alt={product.name}
                                src={product.thumbnailImage}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">{product.name}</h2>
                                <p className="text-gray-500">{product.category}</p>
                                {product.price && <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>}
                                <p className="text-gray-600">
                                    {product.description}
                                </p>
                            </div>
                            <Button className="mt-4 w-full" onClick={() => handleCart(product.id)}>
                                View
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

