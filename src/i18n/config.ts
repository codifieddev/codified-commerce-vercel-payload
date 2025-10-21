export type Locale = (typeof locales)[number];

export const locales = ["pl", "en", "hr"] as const;
export const defaultLocale: Locale = "en";
