// import Link from "next/link";
// import { getLocale } from "next-intl/server";

// import { CMSLink } from "@/components/Link";
// import { LocaleSwitch } from "@/components/LocaleSwitch/LocaleSwitch";
// import { Logo } from "@/components/Logo/Logo";
// import RichText from "@/components/RichText";
// import { type Locale } from "@/i18n/config";
// import { CurrencySelector } from "@/stores/Currency/CurrencySelector";
// import { getCachedGlobal } from "@/utilities/getGlobals";

// import type { Footer, ShopSetting } from "@/payload-types";

// export async function Footer() {
//   const locale = (await getLocale()) as Locale;
//   const footerData: Footer = await getCachedGlobal("footer", locale, 1)();
//   const shopSettings: ShopSetting = await getCachedGlobal("shopSettings", locale, 1)();
//   const navItems = footerData?.navItems ?? [];

//   return (
//     <footer className="mt-auto border-t border-border bg-black text-white dark:bg-card">
//       <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
//         <Link className="flex items-center" href="/">
//           <Logo />
//         </Link>

//         <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
//           <CurrencySelector currencyOptions={shopSettings.availableCurrencies} />
//           <LocaleSwitch />
//           <nav className="flex flex-col gap-4 md:flex-row">
//             {navItems.map(({ link }, i) => {
//               return <CMSLink className="text-white" key={i} {...link} />;
//             })}
//           </nav>
//         </div>
//       </div>
//       {footerData.attribution ? (
//         <div className="flex border-t p-4 text-xs">
//           <div className="container">
//             <RichText data={footerData.attribution} />
//           </div>
//         </div>
//       ) : null}
//     </footer>
//   );
// }


import Link from "next/link";
import { getLocale } from "next-intl/server";

import { CMSLink } from "@/components/Link";
import { LocaleSwitch } from "@/components/LocaleSwitch/LocaleSwitch";
import { Logo } from "@/components/Logo/Logo";
import RichText from "@/components/RichText";
import { type Locale } from "@/i18n/config";
import { CurrencySelector } from "@/stores/Currency/CurrencySelector";
import { getCachedGlobal } from "@/utilities/getGlobals";

import type { Footer, ShopSetting } from "@/payload-types";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const footerData: Footer = await getCachedGlobal("footer", locale, 1)();
  const shopSettings: ShopSetting = await getCachedGlobal("shopSettings", locale, 1)();
  const navItems = footerData?.navItems ?? [];

  return (
    <footer className="mt-auto bg-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <Link className="flex items-center" href="/">
              <Logo />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {navItems.slice(0, 4).map(({ link }, i) => (
                <CMSLink key={i} className="text-sm text-gray-600 hover:text-orange-500 transition-colors" {...link} />
              ))}
            </nav>
          </div>

          {/* Customer Area */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black">Customer Area</h3>
            <nav className="flex flex-col gap-3">
              {navItems.slice(4, 9).map(({ link }, i) => (
                <CMSLink key={i} className="text-sm text-gray-600 hover:text-orange-500 transition-colors" {...link} />
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black">Contact</h3>
            <p className="mb-4 text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Have any question?</p>
                <p className="text-sm font-semibold text-orange-500">+ 123 456 789</p>
              </div>
            </div>
            <button className="rounded-md border-2 border-blue-500 bg-white px-6 py-2.5 text-sm font-medium text-blue-500 hover:bg-blue-50 transition-colors">
              LIVE CHAT
            </button>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-12 items-center rounded-lg bg-black px-4 hover:bg-gray-800 transition-colors">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="ml-2 text-left">
                  <p className="text-xs text-gray-400">Download on the</p>
                  <p className="text-sm font-semibold text-white">App Store</p>
                </div>
              </a>
              <a href="#" className="flex h-12 items-center rounded-lg bg-black px-4 hover:bg-gray-800 transition-colors">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
                <div className="ml-2 text-left">
                  <p className="text-xs text-gray-400">GET IT ON</p>
                  <p className="text-sm font-semibold text-white">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>ELEXTRA - © 2020 All Rights Reserved</span>
          </div>
          <div className="flex items-center gap-4">
            <CurrencySelector currencyOptions={shopSettings.availableCurrencies} />
            <LocaleSwitch />
            <span className="text-xs text-gray-500">Payment</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-600">VASI</span>
              <span className="text-sm font-semibold text-orange-500">MASTERCARD</span>
              <span className="text-sm font-semibold text-blue-500">PEYPOL</span>
              <span className="text-sm font-semibold text-yellow-500">BITKOIN</span>
            </div>
          </div>
        </div>
      </div>

      {footerData.attribution ? (
        <div className="hidden">
          <RichText data={footerData.attribution} />
        </div>
      ) : null}
    </footer>
  );
}