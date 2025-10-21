"use client";

import React from "react";
import { Star, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
}

interface Specification {
  label: string;
  value: string;
}

interface ProductDetailProps {
  product?: {
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    images: string[];
    description: string;
    specifications: Specification[];
    shippingInfo: string;
    returnPolicy: string;
  };
  recommendations?: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product = {
    name: "Petty Classic 170mm",
    price: 210.0,
    originalPrice: 240.0,
    rating: 5.0,
    reviewCount: 738,
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1567696153798-de9682e46a58?w=200&h=200&fit=crop",
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    specifications: [
      { label: "Length", value: "170mm" },
      { label: "Width", value: "37mm" },
      { label: "Thickness", value: "1.7mm" },
      { label: "Weight", value: "123g" },
      { label: "Handle Lenght", value: "115.9mm" },
      { label: "Blade Angle", value: "20°/20°" },
      { label: "HRC Steel", value: "62-64hrc" },
      { label: "Knife use", value: "All-in-one (mostly home cutting)" },
    ],
    shippingInfo:
      "FREE shipping on EUR+ orders! For orders below EUR 99, a flat fee of EUR 20+VAT, which is 7% (calculated after tax free). For EU orders, the tax is included. For UK orders, the tax will be calculated after the 30 days arrival where no additional tax levied. For all other regions, standard international shipping requirements will apply.",
    returnPolicy:
      "We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method within 14 business days. If not approved, it could be due to item condition. Please remember that it can take some time for your bank or credit card company to process and post the refund too. If more than 15 business days have passed since we've approved your return, please contact us.",
  },
  recommendations = [
    {
      id: "1",
      name: "Wooden Box",
      price: 45.0,
      originalPrice: 55.0,
      image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=400&h=300&fit=crop",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
    {
      id: "2",
      name: "Hoodie",
      price: 64.0,
      originalPrice: 75.0,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    },
  ],
}) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(product.images[0]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-500">Home / Shop / Petty Classic 170mm</div>

      {/* Product Section */}
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="mb-4">
            <img src={selectedImage} alt={product.name} className="h-96 w-full rounded-lg object-cover" />
          </div>
          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} view ${idx + 1}`}
                className={`h-20 w-20 cursor-pointer rounded border-2 object-cover ${
                  selectedImage === img ? "border-orange-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-3xl font-bold text-orange-500">EUR {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                EUR {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center">
              <span className="mr-2 text-2xl font-bold">{product.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
                ))}
              </div>
            </div>
            <span className="text-gray-500">{product.reviewCount} reviews</span>
          </div>

          <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
            <ShoppingCart className="h-5 w-5" />
            Add To Bag
          </button>

          <div className="mb-6 text-sm text-gray-600">
            <p>Category: Petty</p>
            <p>Free shipping if order over 100 euros (tax excluded)</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-bold">Description</h2>
            <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-bold">Specifications</h2>
            <div className="space-y-2">
              {product.specifications.map((spec, idx) => (
                <div key={idx} className="flex justify-between border-b border-gray-200 py-2">
                  <span className="text-gray-600">{spec.label}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Returns */}
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-bold">Shipping & Returns</h3>
              <p className="text-sm text-gray-600">{product.shippingInfo}</p>
            </div>
            <div>
              <h3 className="mb-2 font-bold">Return Policy</h3>
              <p className="text-sm text-gray-600">{product.returnPolicy}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="mb-6 text-2xl font-bold">Recommended next to this product:</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {recommendations.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-lg border border-gray-200 p-4">
              <img src={item.image} alt={item.name} className="h-32 w-32 rounded object-cover" />
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold">{item.name}</h3>
                <p className="mb-4 text-sm text-gray-600">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-orange-500">EUR {item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        EUR {item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="rounded bg-orange-500 px-4 py-2 text-sm text-white transition hover:bg-orange-600">
                    Add To Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
