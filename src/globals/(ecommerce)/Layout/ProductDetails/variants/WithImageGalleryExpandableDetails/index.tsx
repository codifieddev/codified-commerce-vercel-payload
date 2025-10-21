import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabPanel } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { type Product, type ShopLayout } from "@/payload-types";
import { type Currency } from "@/stores/Currency/types";
import { cn } from "@/utilities/cn";

import { ProductForm } from "./components/ProductForm";
import { ProductGallery } from "./components/ProductGallery";

import { type FilledVariant } from "../../types";
import { ChevronDownIcon, ChevronUp, Eye } from "lucide-react";

const  recommendations = [
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
];

export const WithImageGalleryExpandableDetails = ({
  variant,
  product,
  productSettings,
}: {
  variant?: string;
  product: Product;
  productSettings: ShopLayout["productDetails"];
}) => {
  const filledVariants: FilledVariant[] | undefined = product.variants?.map((variant) => ({
    color: product.colors?.find((color) => {
      return color.slug === variant.color;
    }),
    size: product.sizes?.find((size) => size.slug === variant.size),
    slug: variant.variantSlug,
    stock: variant.stock,
    image: typeof variant.image !== "string" ? variant.image : null,
    pricing: variant.pricing as
      | { value: number; currency: Currency; id?: string | null }[]
      | null
      | undefined,
  }));



  const selectedVariant =
    filledVariants?.find((filledVariant) => filledVariant.slug === variant) ?? filledVariants?.find((variant) => variant.stock > 0) ?? filledVariants?.[0];

  const maxQuantity = selectedVariant?.stock ?? product.stock ?? 999;
  const minQuantity = 1;

  console.log(product);

  const t = useTranslations("ProductDetails");

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}

          <ProductGallery
            product={product}
            selectedVariant={selectedVariant}
            minQuantity={minQuantity}
            maxQuantity={maxQuantity}
            tabs={product.images.map(
              (image) =>
                typeof image !== "string" && (
                  <TabPanel key={image.id}>
                    <Media
                      placeholder="empty"
                      resource={image}
                      className="aspect-square w-full object-fill sm:rounded-lg flex items-center justify-center bg-gray-100"
                    />
                  </TabPanel>
                ),
            )}
          >
            {product.images.map(
              (image) =>
                typeof image !== "string" && (
                  <Tab
                    key={image.id}
                    className="focus:ring-3 focus:outline-hidden focus:ring-main-500/50 group relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:ring-offset-4"
                  >
                    <span className="sr-only">{image.alt}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <Media resource={image} className="size-full object-cover" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-main-500"
                    />
                  </Tab>
                ),
            )}
          </ProductGallery>

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h2>
            <h2 className="font-bold tracking-tight text-gray-900 flex gap-1 items-center text-[12px]"><Eye size={15} /> 1.4 k <span className="font-light">Viewed</span></h2>

            </div>

          
           <div className="flex justify-between items-center">
           <div className="mt-3">
              <h2 className="sr-only">{t("product-info")}</h2>
              <p className="text-3xl tracking-tight text-gray-900 flex flex-col gap-1">
                <PriceClient
                className="text-[#ff6700]"
                  pricing={
                    (product.enableVariants &&
                    product.enableVariantPrices &&
                    product.variants &&
                    selectedVariant
                      ? selectedVariant.pricing
                      : product.pricing) ?? []
                  }
                />
                <span className="italic text-[14px]">25% VAT Included</span>
              </p>
            </div>

            {productSettings.reviewsEnabled && (
                <div className="mt-3">
                  <h3 className="sr-only">{t("reviews")}</h3>
                  <div className="flex flex-col gap-2 justify-end items-end">
                    <div>
                      <span className="text-5xl font-bold text-[#ff6700] mr-2">
                        5.0<span className="text-gray-900 text-[16px]">/5</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={cn(
                           
                            "text-[#ff6700]",
                            "size-5 shrink-0",
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-[12px]">223 Reviews from Petty Owners</p>
                  </div>
                </div>
              
            )}
           </div>

           <div className="border border-gray-300 w-full mt-3"></div>

            

            {product.description && (
              <div className="mt-6">
                <h3 className="sr-only">{t("description")}</h3>
                <RichText className="space-y-6 text-base text-gray-700" data={product.description} />
              </div>
            )}

            <ProductForm
              product={product}
              minQuantity={minQuantity}
              maxQuantity={maxQuantity}
              selectedVariant={selectedVariant}
              filledVariants={filledVariants}
            />

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                {t("additional-details")}
              </h2>

              <div className="divide-gray-360 divide-y border-t">
                {product.details?.map((detail) => {
                  const contentforSpecification = detail.content.root.children.map((item:any) => {
                    
                      const text = item.children.map(child => child.text).join(" ");
                      const [key, ...rest] = text.split(":");
                      const value = rest.join(":").trim(); // handles cases where value has ":"
                      return [`${key.trim()}:`, [value]];
                  
                  });
                 
              
                  return (
                    <Disclosure key={detail.id} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-sm font-medium text-gray-900 group-data-open:text-main-600">
                            {detail.title}
                          </span>
                          <span className="ml-6 flex items-center">
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-open:hidden"
                            />
                            <ChevronUp 
                              aria-hidden="true"
                              className="hidden size-6 text-main-400 group-hover:text-main-500 group-data-open:block"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pb-6">
                        {detail.title != "Specifications" && <RichText
                          className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300"
                          data={detail.content}
                        />}
  
                        {detail.title === "Specifications" && (
                          <table className="w-full text-sm text-left text-gray-500">
                            <tbody>
                              {contentforSpecification.map(([value1, value2],index) => (
                                <tr
                                  key={index}
                                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} flex justify-between` }
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                  >
                        {value1}
                                  </th>
                                  <td className="px-6 py-4">{value2[0]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </DisclosurePanel>
                    </Disclosure>
                  )
                }
                )}
              </div>
            </section>

            <section aria-labelledby="related-products" className="mt-12">
          
        <h2 className="mb-6 text-2xl font-bold">Recommended next to this product:</h2>
        <div className="flex flex-col gap-2">
          {recommendations.map((item) => (
            <div key={item.id} className="flex gap-4 h-60 rounded-lg bg-[#BAC095]">
              <img src={item.image} alt={item.name} className="h-60 w-62 rounded object-cover " />
              <div className="pl-2 pr-4 py-6">
                <h3 className="mb-2 text-lg font-bold">{item.name}</h3>
                <p className="mb-4 text-sm text-gray-600">{item.description}</p>
                <div className="flex flex-row-reverse items-center justify-between">
                  <div className="flex flex-col items-end gap-1 leading-1">
                    <span className="text-xl font-bold text-orange-500">EUR {item.price.toFixed(2)}</span>
                    <span className="italic text-[10px]">25% VAT Included</span>
                  </div>
                  <button className="rounded bg-orange-500 px-4 py-2 text-sm text-white transition hover:bg-orange-600">
                    Add To Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
   
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
