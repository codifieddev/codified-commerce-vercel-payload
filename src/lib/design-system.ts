export const designSystem = {
  colors: {
    primary: "#FF7020",
    dark: "#1a1a1a",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      500: "#6b7280",
      700: "#374151",
      900: "#111827",
    },
  },
  fonts: {
    primary: "Inter, sans-serif",
  },
  spacing: {
    section: "py-16 md:py-24",
  },
  container: {
    base: "container mx-auto px-4 sm:px-6 lg:px-8",
    narrow: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
  },
  button: {
    primary:
      "bg-[#FF7020] hover:bg-[#e66319] text-white font-medium rounded-full px-8 py-3 transition-all duration-300",
  },
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 },
    },
  },
};
