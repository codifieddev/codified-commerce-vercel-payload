"use client";
import { useLocale } from "next-intl";

import { useCurrency } from "@/stores/Currency";
import { formatPrice } from "@/utilities/formatPrices";

export const PriceClient = ({
  pricing,
  className
}: {
  pricing: {
    value: number;
    currency: string;
  }[];
  className?: string;
}) => {
  const { currency } = useCurrency();
  const locale = useLocale();
  const price =
    pricing.length > 0
      ? (pricing.find((price) => price.currency === currency)?.value ?? pricing[0].value)
      : 0;

  return <span className={className}>{formatPrice(price, currency, locale)}</span>;
};
