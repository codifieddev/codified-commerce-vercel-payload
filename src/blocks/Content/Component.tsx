"use client";

import {
  spacingTopClasses,
  spacingBottomClasses,
  getCenteringClasses,
  paddingBottomClasses,
  paddingTopClasses,
} from "@/blocks/globals";
import { CMSLink } from "@/components/Link";
import { cn } from "@/utilities/cn";
import { Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80";

export const ContentBlock = (props: any) => {
  const colsSpanClasses = {
    oneSixth: "lg:col-span-2",
    oneThird: "lg:col-span-4",
    half: "lg:col-span-6",
    twoThirds: "lg:col-span-8",
    fiveSixth: "lg:col-span-10",
    full: "lg:col-span-12",
  };

  const isSingleRadius = !props.specifiedRadius && props.radius && props.radiusAll;
  const isMultiRadius = props.specifiedRadius && props.radius && !isSingleRadius;

  return (
    <section
      className={cn(
        "relative container px-0",
        spacingTopClasses[props.spacingTop ?? "medium"],
        spacingBottomClasses[props.spacingBottom ?? "medium"],
        paddingTopClasses[props.paddingTop ?? "medium"],
        paddingBottomClasses[props.paddingBottom ?? "medium"],
        getCenteringClasses(props.alignment ?? undefined),
        isSingleRadius && props.radiusAll,
        isMultiRadius &&
          `${props.radiusTopLeft} ${props.radiusTopRight} ${props.radiusBottomRight} ${props.radiusBottomLeft}`,
      )}
    >
      <div className="grid grid-cols-4 gap-y-8 lg:grid-cols-12">
        {props.columns?.map((col: any, index: number) => {
          const { size, background, Heading, Description } = col;

          return (
            <div
              key={index}
              className={cn(
                "col-span-4 px-8",
                colsSpanClasses[size ?? "half"],
                paddingTopClasses[col.paddingTop ?? "medium"],
                paddingBottomClasses[col.paddingBottom ?? "medium"],
              )}
              style={background ? { background } : {}}
            >
              {Array.isArray(col["Select Type"]) &&
                col["Select Type"].map((item: any, idx: number) => {
                  switch (item.blockType) {
                    case "vdc":
                      return <OuterInfo key={idx} data={item} />;
                    case "product-category-block":
                      return (
                        <ProductCategoryBlock
                          key={idx}
                          data={item}
                          Heading={Heading}
                          Description={Description}
                        />
                      );
                    default:
                      return null;
                  }
                })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ---------------------------------------------------
   🧱 OuterInfo Block (VDC-like block with overlay)
--------------------------------------------------- */
const OuterInfo = ({ data }: { data: any }) => {
  const { title, other_info = [], links = [], media } = data;
  const bgImage = media?.url || fallbackImage;

  return (
    <div
      className="relative overflow-hidden rounded-2xl text-white shadow-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Play Icon Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
          <Play className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10 lg:p-12">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">{title}</h2>

        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-8">
            {other_info.map((info: any, i: number) => (
              <div key={i}>
                <p className="text-base font-semibold">{info.value}</p>
                <p className="text-sm italic opacity-80">{info.label}</p>
              </div>
            ))}
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4">
              {links.map((linkItem, i) => {
                const {
                  label,
                  url,
                  reference,
                  newTab,
                  buttonVariant = "solid",
                  buttonColor,
                  buttonTextColor,
                  buttonSize = "medium",
                  buttonRounded = "full",
                } = linkItem;

                const link = {
                  type: reference ? "reference" : "custom",
                  url: url || undefined,
                  reference: reference || undefined,
                  newTab,
                  label,
                };

                const baseClasses =
                  "inline-flex items-center justify-center font-medium transition-all duration-200";
                const buttonSizeClasses = {
                  small: "px-4 py-2 text-sm",
                  medium: "px-6 py-3 text-base",
                  large: "px-8 py-4 text-lg",
                };
                const buttonRoundedClasses = {
                  none: "rounded-none",
                  sm: "rounded-sm",
                  md: "rounded-md",
                  lg: "rounded-lg",
                  full: "rounded-full",
                };

                let className = `${baseClasses} ${buttonSizeClasses[buttonSize]} ${buttonRoundedClasses[buttonRounded]}`;
                let style: React.CSSProperties = {};

                if (buttonVariant === "solid") {
                  style.backgroundColor = buttonColor || "#ff6b35";
                  style.color = buttonTextColor || "#ffffff";
                } else if (buttonVariant === "outline") {
                  style.border = `2px solid ${buttonColor || "#ff6b35"}`;
                  style.color = buttonColor || "#ff6b35";
                } else {
                  style.color = buttonColor || "#ff6b35";
                }

                return (
                  <li key={i}>
                    <CMSLink {...link} className={className} style={style}>
                      {label}
                    </CMSLink>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   🧱 ProductCategoryBlock (4 button filter + grid)
--------------------------------------------------- */
const ProductCategoryBlock = ({
  key,
  data,
  Heading,
  Description,
}: {
  key: number;
  data: any;
  Heading: string;
  Description: string;
}) => {
  const { categories = [] } = data;
  const [activeCategory, setActiveCategory] = useState(categories[0]?.label || "");

  const filteredProducts = categories.find((d: any) => d.label == activeCategory).products;

  return (
    <div className="w-full space-y-8">
      <h2>{Heading}</h2>
      <p>{Description}</p>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 border-b border-gray-200 pb-2">
        {categories.map((cat: any, i: number) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.label)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
              activeCategory === cat.label
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((p: any, i: number) => {
          const image = "http://localhost:3000" + p?.images?.[0]?.url || fallbackImage;
          const price = p?.pricing[0]?.value || 0;

          return (
            <Link
              key={i}
              className="cursor-pointer overflow-hidden rounded-xl bg-white shadow transition-all hover:shadow-md"
              href={`/product/${p.slug}`}
            >
              <div className="relative aspect-square">
                <img src={image || fallbackImage} alt={p.title || "Product"} className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <p className="text-base font-semibold text-gray-900">{p.title}</p>
                <p className="mt-1 font-medium text-orange-500">{price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
