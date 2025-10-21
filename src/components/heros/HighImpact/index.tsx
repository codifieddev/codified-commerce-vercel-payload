// // "use client";
// // import { useEffect } from "react";

// // import { CMSLink } from "@/components/Link";
// // import { Media } from "@/components/Media";
// // import RichText from "@/components/RichText";
// // import { useHeaderTheme } from "@/providers/HeaderTheme";

// // import type { Page } from "@/payload-types";

// // export const HighImpactHero = ({ links, media, richText }: Page["hero"]) => {
// //   const { setHeaderTheme } = useHeaderTheme();

// //   useEffect(() => {
// //     setHeaderTheme("dark");
// //   });

// //   return (
// //     <div className="relative -mt-[10.4rem] flex items-center justify-center text-white" data-theme="dark">
// //       <div className="relative z-10 container mb-8 flex items-center justify-center">
// //         <div className="max-w-146 md:text-center">
// //           {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
// //           {Array.isArray(links) && links.length > 0 && (
// //             <ul className="flex gap-4 md:justify-center">
// //               {links.map(({ link }, i) => {
// //                 return (
// //                   <li key={i}>
// //                     <CMSLink {...link} />
// //                   </li>
// //                 );
// //               })}
// //             </ul>
// //           )}
// //         </div>
// //       </div>
// //       <div className="min-h-[80vh] select-none">
// //         {media && typeof media === "object" && (
// //           <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// "use client";
// import { useEffect } from "react";

// import { CMSLink } from "@/components/Link";
// import { Media } from "@/components/Media";
// import { useHeaderTheme } from "@/providers/HeaderTheme";

// import type { Page } from "@/payload-types";

// export const HighImpactHero = ({ heading, subheading, links, media }: Page["hero"]) => {
//   const { setHeaderTheme } = useHeaderTheme();

//   useEffect(() => {
//     setHeaderTheme("dark");
//   });

//   return (
//     <div className="relative -mt-[10.4rem] flex items-center justify-center text-white" data-theme="dark">
//       <div className="relative z-10 container mb-8 flex items-center justify-center">
//         <div className="max-w-146 md:text-center">
//           {heading && <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{heading}</h1>}
//           {subheading && <p className="mb-6 text-lg text-gray-200 md:text-xl">{subheading}</p>}
//           {Array.isArray(links) && links.length > 0 && (
//             <ul className="flex flex-wrap gap-4 md:justify-center">
//               {links.map((linkItem, i) => {
//                 const {
//                   linkType,
//                   label,
//                   url,
//                   reference,
//                   newTab,
//                   buttonVariant,
//                   buttonColor,
//                   buttonSize,
//                   icon,
//                   iconPosition,
//                 } = linkItem;

//                 // Construct the link object for CMSLink
//                 const link = {
//                   type: reference ? "reference" : "custom",
//                   url: url || undefined,
//                   reference: reference || undefined,
//                   newTab,
//                   label,
//                 };

//                 // Base classes for all links
//                 const baseClasses = "inline-flex items-center gap-2 transition-all duration-200";

//                 // Button styles
//                 const buttonVariants = {
//                   primary: "bg-white text-gray-900 hover:bg-gray-100",
//                   secondary: "bg-gray-700 text-white hover:bg-gray-600",
//                   outline: "border-2 border-white text-white hover:bg-white hover:text-gray-900",
//                   ghost: "text-white hover:bg-white/10",
//                   "link-style": "text-white underline hover:no-underline",
//                 };

//                 const buttonColors = {
//                   default: "",
//                   brand: "!bg-blue-600 !text-white hover:!bg-blue-700 border-blue-600",
//                   success: "!bg-green-600 !text-white hover:!bg-green-700 border-green-600",
//                   danger: "!bg-red-600 !text-white hover:!bg-red-700 border-red-600",
//                   warning: "!bg-yellow-500 !text-gray-900 hover:!bg-yellow-600 border-yellow-500",
//                   info: "!bg-cyan-600 !text-white hover:!bg-cyan-700 border-cyan-600",
//                   dark: "!bg-gray-900 !text-white hover:!bg-gray-800 border-gray-900",
//                   light: "!bg-gray-100 !text-gray-900 hover:!bg-gray-200 border-gray-100",
//                 };

//                 const buttonSizes = {
//                   small: "px-4 py-2 text-sm",
//                   medium: "px-6 py-3 text-base",
//                   large: "px-8 py-4 text-lg",
//                 };

//                 // Build className based on linkType
//                 let className = baseClasses;

//                 if (linkType === "button") {
//                   className += ` ${buttonSizes[buttonSize || "medium"]} rounded-md font-medium`;
//                   className += ` ${buttonVariants[buttonVariant || "primary"]}`;

//                   if (buttonColor && buttonColor !== "default") {
//                     className += ` ${buttonColors[buttonColor]}`;
//                   }
//                 } else {
//                   // Normal link styles
//                   className += " text-white hover:underline";
//                 }

//                 return (
//                   <li key={i}>
//                     <CMSLink {...link} className={className}>
//                       {icon && iconPosition === "left" && <span className="icon">{icon}</span>}
//                       {label}
//                       {icon && iconPosition === "right" && <span className="icon">{icon}</span>}
//                     </CMSLink>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>
//       <div className="min-h-[80vh] select-none">
//         {media && typeof media === "object" && (
//           <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
//         )}
//       </div>
//     </div>
//   );
// };

"use client";
import { useEffect } from "react";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { useHeaderTheme } from "@/providers/HeaderTheme";

import type { Page } from "@/payload-types";

export const HighImpactHero = (props: any) => {
  const {
    heading,
    subheading,
    links,
    media,
    contentAlignment = "left",
    verticalAlignment = "center",
    minHeight = "80vh",
    contentMaxWidth,
    backgroundColor = "#1a1a1a",
    enableOverlay = true,
    overlayColor = "#000000",
    overlayOpacity = 0.5,
    headingSize = "large",
    headingWeight = "bold",
    headingColor = "#ffffff",
    subheadingSize = "medium",
    subheadingColor = "#e5e5e5",
    subheadingStyle = "normal",
    headingMarginBottom = "4",
    subheadingMarginBottom = "6",
  } = props;

  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  // Alignment classes
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center md:text-center",
    right: "items-end text-right",
  };

  const verticalAlignmentClasses = {
    top: "justify-start pt-32",
    center: "justify-center",
    bottom: "justify-end pb-32",
  };

  // Heading size classes
  const headingSizeClasses = {
    small: "text-3xl md:text-4xl lg:text-5xl",
    medium: "text-4xl md:text-5xl lg:text-6xl",
    large: "text-5xl md:text-6xl lg:text-7xl",
    xlarge: "text-6xl md:text-7xl lg:text-8xl",
  };

  const headingWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  // Subheading size classes
  const subheadingSizeClasses = {
    small: "text-sm md:text-base",
    medium: "text-base md:text-lg",
    large: "text-lg md:text-xl",
  };

  return (
    <div
      className="relative -mt-[10.4rem] flex text-white"
      data-theme="dark"
      style={{
        minHeight,
        backgroundColor: !media ? backgroundColor : undefined,
      }}
    >
      {/* Overlay */}
      {enableOverlay && media && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
      )}

      {/* Content */}
      <div
        className={`relative z-10 container flex flex-col ${alignmentClasses[contentAlignment || "left"]} ${verticalAlignmentClasses[verticalAlignment || "center"]}`}
      >
        <div
          style={{
            maxWidth: contentMaxWidth || undefined,
          }}
        >
          {heading && (
            <h1
              className={`mb-${headingMarginBottom} ${headingSizeClasses[headingSize || "large"]} ${headingWeightClasses[headingWeight || "bold"]}`}
              style={{
                color: headingColor,
              }}
            >
              {heading}
            </h1>
          )}
          {subheading && (
            <p
              className={`mb-${subheadingMarginBottom} ${subheadingSizeClasses[subheadingSize || "medium"]} ${subheadingStyle === "italic" ? "italic" : ""}`}
              style={{
                color: subheadingColor,
              }}
            >
              {subheading}
            </p>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul
              className={`flex flex-wrap gap-4 ${contentAlignment === "center" ? "justify-center" : contentAlignment === "right" ? "justify-end" : "justify-start"}`}
            >
              {links.map((linkItem, i) => {
                const {
                  linkType,
                  label,
                  url,
                  reference,
                  newTab,
                  buttonVariant = "solid",
                  buttonColor,
                  buttonTextColor,
                  buttonSize = "medium",
                  buttonRounded = "full",
                  icon,
                  iconPosition,
                } = linkItem;

                // Construct the link object for CMSLink
                const link = {
                  type: reference ? "reference" : "custom",
                  url: url || undefined,
                  reference: reference || undefined,
                  newTab,
                  label,
                };

                // Base classes
                const baseClasses = "inline-flex items-center gap-2 transition-all duration-200 font-medium";

                // Button size classes
                const buttonSizeClasses = {
                  small: "px-4 py-2 text-sm",
                  medium: "px-6 py-3 text-base",
                  large: "px-8 py-4 text-lg",
                };

                // Button rounded classes
                const buttonRoundedClasses = {
                  none: "rounded-none",
                  sm: "rounded-sm",
                  md: "rounded-md",
                  lg: "rounded-lg",
                  full: "rounded-full",
                };

                // Build className and styles
                let className = baseClasses;
                let style: React.CSSProperties = {};

                if (linkType === "button") {
                  className += ` ${buttonSizeClasses[buttonSize]} ${buttonRoundedClasses[buttonRounded]}`;

                  // Apply variant styles
                  if (buttonVariant === "solid") {
                    style.backgroundColor = buttonColor || "#ff6b35";
                    style.color = buttonTextColor || "#ffffff";
                    className += " hover:opacity-90";
                  } else if (buttonVariant === "outline") {
                    style.borderWidth = "2px";
                    style.borderColor = buttonColor || "#ff6b35";
                    style.color = buttonColor || "#ff6b35";
                    className += " hover:bg-opacity-10";
                    style.backgroundColor = "transparent";
                  } else if (buttonVariant === "ghost") {
                    style.color = buttonColor || "#ff6b35";
                    className += " hover:bg-white hover:bg-opacity-10";
                  }
                } else {
                  // Normal link styles
                  className += " hover:underline";
                  style.color = buttonTextColor || "#ffffff";
                }

                return (
                  <li key={i}>
                    <CMSLink {...link} className={className} style={style}>
                      {/* {icon && iconPosition === "left" && <span className="icon">{icon}</span>} */}
                      {/* {label} */}
                      {/* {icon && iconPosition === "right" && <span className="icon">{icon}</span>} */}
                    </CMSLink>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Background Media */}
      <div className="absolute inset-0 select-none">
        {media && typeof media === "object" && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  );
};
