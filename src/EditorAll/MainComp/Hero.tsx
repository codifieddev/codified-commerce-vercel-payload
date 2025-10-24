// import { ComponentConfig } from "@measured/puck";

import { ComponentConfig } from "@measured/puck";

// export const HeroContainer: ComponentConfig = {
//   label: "Hero Container",
//   fields: {
//     text: {
//       type: "slot",
//       allow: ["Text", "Button"],
//     },
//   },
//   resolveFields: (data): any => {
//     const fields = {
//       background: {
//         type: "radio",
//         label: "Background Type",
//         options: [
//           { label: "Normal", value: "normal" },
//           { label: "BackBehind", value: "back" },
//         ],
//       },
//     };

//     if (data.props.background === "normal") {
//       return {
//         ...fields,
//         backgroundColor: {
//           type: "text",
//           label: "BG Color",
//         },
//       };
//     } else if (data.props.background === "back") {
//       return {
//         ...fields,
//         backgroundUrl: {
//           type: "text",
//           label: "Background Image URL",
//         },
//       };
//     }

//     return fields;
//   },

//   render: ({ background, backgroundColor, backgroundUrl, text: Content }) => {
//     const getBackgroundStyle = () => {
//       if (background === "normal" && backgroundColor) {
//         return { backgroundColor };
//       }
//       if (background === "back" && backgroundUrl) {
//         return {
//           backgroundImage: `url(${backgroundUrl})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         };
//       }
//       return { backgroundColor: "#FFBF00" }; // default fallback
//     };

//     return (
//       <section className="flex h-[70vh] w-screen items-center p-5">
//         <div
//           style={getBackgroundStyle()}
//           className="flex h-full w-full flex-col items-center justify-center gap-3 p-5 text-center text-white"
//         >
//           <Content />
//         </div>
//       </section>
//     );
//   },
// };

export const HeroContainer: ComponentConfig = {
  label: "Hero Section",
  fields: {
    content: {
      type: "slot",
      label: "Hero Content",
      allow: ["Text", "Button", "Divider", "Spacer", "Image"],
    },
  },
  resolveFields: (data): any => {
    const baseFields = {
      content: {
        type: "slot",
        label: "Hero Content",
        allow: ["Text", "Button", "Divider", "Spacer", "Image"],
      },
      layout: {
        type: "radio",
        label: "Layout",
        options: [
          { label: "Centered", value: "centered" },
          { label: "Split (Text Left)", value: "split-left" },
          { label: "Split (Text Right)", value: "split-right" },
          { label: "Overlay on Image", value: "overlay" },
        ],
      },
      minHeight: {
        type: "text",
        label: "Min Height (e.g., 60vh, 500px)",
      },
      backgroundColor: {
        type: "text",
        label: "Background Color",
      },
      textColor: {
        type: "text",
        label: "Text Color",
      },
      padding: {
        type: "text",
        label: "Padding (e.g., 5, 10, 20)",
      },
    };

    if (data.props.layout === "overlay") {
      return {
        ...baseFields,
        backgroundImage: {
          type: "text",
          label: "Background Image URL",
        },
        overlayOpacity: {
          type: "text",
          label: "Overlay Opacity (0-1)",
        },
        overlayColor: {
          type: "text",
          label: "Overlay Color",
        },
      };
    }

    return baseFields;
  },
  defaultProps: {
    layout: "centered",
    minHeight: "70vh",
    backgroundColor: "#f3f4f6",
    textColor: "#111827",
    padding: "10",
    backgroundImage: "",
    overlayOpacity: "0.5",
    overlayColor: "#000000",
  },
  render: ({
    content: Content,
    layout,
    minHeight,
    backgroundColor,
    textColor,
    padding,
    backgroundImage,
    overlayOpacity,
    overlayColor,
  }) => {
    const isCentered = layout === "centered";
    const isSplitLeft = layout === "split-left";
    const isSplitRight = layout === "split-right";
    const isOverlay = layout === "overlay";

    const containerStyle = isOverlay
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative" as const,
        }
      : {
          backgroundColor,
        };

    const overlayStyle = isOverlay
      ? {
          position: "absolute" as const,
          inset: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }
      : {};

    const contentWrapperClass = isCentered
      ? "mx-auto max-w-4xl text-center"
      : isSplitLeft || isSplitRight
        ? "grid items-center gap-8 md:grid-cols-2"
        : "mx-auto max-w-4xl";

    return (
      <section style={containerStyle} className="relative w-screen">
        {isOverlay && <div style={overlayStyle} />}
        <div
          style={{
            minHeight,
            color: textColor,
          }}
          className={`relative z-10 flex items-center p-${padding}`}
        >
          <div className={`w-full ${contentWrapperClass}`}>
            {isSplitRight && (
              <div className="order-2 md:order-1">
                <Content />
              </div>
            )}
            {(isCentered || isSplitLeft || isOverlay) && (
              <div className="space-y-6">
                <Content />
              </div>
            )}
            {(isSplitLeft || isSplitRight) && (
              <div className={isSplitRight ? "order-1 md:order-2" : ""}>
                {/* This is where images typically go in split layouts */}
                <div className="flex items-center justify-center">
                  <Content />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  },
};
