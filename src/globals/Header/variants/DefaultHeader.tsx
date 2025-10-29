"use client";
import { HeartIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import { Media } from "@/components/Media";
import { Link } from "@/i18n/routing";
import { type Header } from "@/payload-types";
import { useCartState } from "@/stores/CartStateStore";
import { useCart } from "@/stores/CartStore";
import { useWishListState } from "@/stores/WishListStateStore";
import { useWishList } from "@/stores/WishlistStore";
import { cn } from "@/utilities/cn";

import { Search } from "../components/Search";
import { Phone } from "lucide-react";

const leftNav = [
  {
    label: "Noževi",
    children: [
      { label: "Petty", href: "/petty" },
      { label: "Gyuto", href: "/gyuto" },
      { label: "Santoku", href: "/santoku" },
      { label: "Nakiri", href: "/nakiri" },
    ],
  },
  { label: "O Noževima", href: "/o-nozevima" },
  { label: "O Karlo Banu", href: "/o-karlo-banu" },
  { label: "Što drugi kažu", href: "/recenzije" },
];
export const DefaultHeader = ({ data, disableCart }: { data: Header; disableCart?: boolean }) => {
  const [isMenuOpened, setisMenuOpened] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [scrollDown, setScrollDown] = useState(false);

  const toggleMenu = () => {
    setisMenuOpened((menuState) => !menuState);
    document.documentElement.classList.toggle("overflow-clip");
    document.documentElement.classList.toggle("overflow-y-clip");
  };

  const { toggleCart } = useCartState();
  const { cart } = useCart();
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const { toggleWishList } = useWishListState();
  const { wishlist } = useWishList();

  useEffect(() => {
    let lastScrollValue = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (data.hideOnScroll) {
        if (scrollTop > lastScrollValue && scrollTop > 300) {
          setScrollDown(true);
        } else if (scrollTop < lastScrollValue) {
          setScrollDown(false);
        }
        lastScrollValue = scrollTop;
      }

      setScrollValue(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data.hideOnScroll]);

  useEffect(() => {
    if (cart) {
      const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
      setTotalQuantity(totalQuantity);
    }
  }, [cart]);

  const classes = cn(
    `sticky flex w-full top-0 justify-center md:px-12 transition-transform z-50`,
    `${data.hideOnScroll && scrollDown ? "-translate-y-full md:-translate-y-full" : ""}`,
  );

  // Normalize background style for hydration
  const headerStyle = data.background ? { background: data.background } : { background: "#000" };

  return (
    <header className={classes} style={headerStyle}>
      <div
        className={`relative container flex w-full items-center justify-between py-4 lg:gap-8 ${scrollValue > 0 ? "scrolled" : ""} ${isMenuOpened ? "opened" : ""}`}
      >
        {/* Logo and Nav */}
        <div className="flex min-w-0 items-center gap-2">
          <nav className="hidden items-center gap-6 lg:flex">
            {leftNav.map((item, i) => {
              if (item.children) {
                return (
                  <div key={i} className="group relative">
                    <span className="cursor-pointer rounded px-2 py-1 font-semibold text-black transition-colors hover:bg-white/10">
                      {item.label}
                    </span>
                    <div className="absolute top-full left-0 z-20 mt-2 hidden min-w-[160px] flex-col gap-2 rounded bg-white px-4 py-2 shadow-lg group-hover:flex">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          href={child.href}
                          className="block rounded px-2 py-1 text-black hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={i}
                  href={item.href}
                  className="rounded px-2 py-1 font-semibold text-black transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex max-w-2xl min-w-0 flex-1 items-center justify-center px-2">
          <div className="w-full">
            <Link href="/" className="flex-shrink-0">
              {data.logo && typeof data.logo !== "string" && data.logo.url && data.logo.alt ? (
                <Media
                  resource={data.logo}
                  className={cn(isMenuOpened && "invert lg:invert-0", "h-[56px] w-auto max-w-[160px]")}
                  imgClassName="h-[56px] w-auto max-w-[160px]"
                />
              ) : (
                <Logo />
              )}
            </Link>
            {/* <Search /> */}
          </div>
        </div>
        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link
            href="/account/orders"
            className="-m-2 flex cursor-pointer items-center gap-1 p-2 font-bold text-black"
          >
            <Phone color="black" width={24} height={24} /> Contact Us
          </Link>
          {!disableCart && (
            <>
              {/* <button onClick={toggleWishList} className="relative -m-2 cursor-pointer p-2">
                {wishlist && wishlist.length > 0 ? (
                  <span className="bg-main-600 absolute top-0 right-0 flex aspect-square h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                    {wishlist.length}
                  </span>
                ) : null}
                <HeartIcon color="white" width={24} height={24} />
              </button> */}
              <button onClick={toggleCart} className="relative -m-2 cursor-pointer p-2">
                {totalQuantity && totalQuantity > 0 ? (
                  <span className="bg-main-600 absolute top-0 right-0 flex aspect-square h-5 w-5 items-center justify-center rounded-full text-xs text-black">
                    {totalQuantity}
                  </span>
                ) : null}
                <ShoppingBagIcon color="black" width={24} height={24} />
              </button>
            </>
          )}
        </div>
        {/* Mobile Nav Toggle */}
        <button
          aria-label="Toggle Menu"
          className="z-20 order-1 ml-4 flex flex-col items-end justify-center gap-[6px] lg:hidden"
          onClick={toggleMenu}
        >
          <div
            className={`h-[3px] w-7 rounded-full bg-white transition-transform ${isMenuOpened && "absolute top-1/2 -translate-y-1/2 rotate-45 invert"}`}
          />
          <div
            className={`h-[3px] w-[22px] rounded-full bg-white transition-opacity ${isMenuOpened && "opacity-0"}`}
          />
          <div
            className={`h-[3px] w-7 rounded-full bg-white transition-transform ${isMenuOpened && "absolute top-1/2 -translate-y-1/2 -rotate-45 invert"}`}
          />
        </button>
        {/* Mobile Nav Drawer */}
        <nav
          className={`fixed top-0 left-0 z-30 flex h-dvh w-full flex-col items-start bg-white p-8 pb-16 transition-transform duration-300 lg:hidden ${isMenuOpened ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex w-full flex-col gap-8 pt-16">
            {leftNav.map((item, i) => {
              if (item.children) {
                return (
                  <div key={i} className="group relative">
                    <span className="cursor-pointer font-semibold text-black">{item.label}</span>
                    <div className="mt-2 flex flex-col gap-2 pl-4">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          href={child.href}
                          className="block rounded px-2 py-1 text-black hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link key={i} href={item.href} className="font-semibold text-black">
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="backdrop_blur absolute left-1/2 -z-30 h-full w-full -translate-x-1/2" />
      </div>
    </header>
  );
};
