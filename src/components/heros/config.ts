// // import { defaultLexical } from "@/fields/defaultLexical";
// // import { linkGroup } from "@/fields/linkGroup";

// // import type { Field } from "payload";

// // export const hero: Field = {
// //   name: "hero",
// //   type: "group",
// //   fields: [
// //     {
// //       name: "type",
// //       type: "select",
// //       defaultValue: "lowImpact",
// //       label: "Type",
// //       options: [
// //         {
// //           label: "None",
// //           value: "none",
// //         },
// //         {
// //           label: "High Impact",
// //           value: "highImpact",
// //         },
// //         {
// //           label: "Medium Impact",
// //           value: "mediumImpact",
// //         },
// //         {
// //           label: "Low Impact",
// //           value: "lowImpact",
// //         },
// //       ],
// //       required: true,
// //     },
// //     {
// //       name: "richText",
// //       type: "richText",
// //       editor: defaultLexical,
// //       localized: true,
// //       label: false,
// //     },
// //     linkGroup({
// //       overrides: {
// //         maxRows: 2,
// //       },
// //     }),
// //     {
// //       name: "media",
// //       type: "upload",
// //       admin: {
// //         condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type as string),
// //       },
// //       relationTo: "media",
// //       required: true,
// //     },
// //     {
// //       name: "reversed",
// //       label: "Reverse photo and text",
// //       type: "checkbox",
// //       admin: {
// //         condition: (_, { type } = {}) => ["mediumImpact"].includes(type as string),
// //       },
// //       required: true,
// //     },
// //   ],
// //   label: false,
// // };

// import { defaultLexical } from "@/fields/defaultLexical";
// import { linkGroup } from "@/fields/linkGroup";

// import type { Field } from "payload";

// export const hero: Field = {
//   name: "hero",
//   type: "group",
//   fields: [
//     {
//       name: "type",
//       type: "select",
//       defaultValue: "lowImpact",
//       label: "Type",
//       options: [
//         {
//           label: "None",
//           value: "none",
//         },
//         {
//           label: "High Impact",
//           value: "highImpact",
//         },
//         {
//           label: "Medium Impact",
//           value: "mediumImpact",
//         },
//         {
//           label: "Low Impact",
//           value: "lowImpact",
//         },
//       ],
//       required: true,
//     },
//     {
//       name: "heading",
//       type: "text",
//       label: "Heading",
//       required: true,
//       localized: true,
//     },
//     {
//       name: "subheading",
//       type: "textarea",
//       label: "Subheading",
//       localized: true,
//     },
//     {
//       name: "richText",
//       type: "richText",
//       editor: defaultLexical,
//       localized: true,
//       label: "Description",
//     },
//     {
//       name: "links",
//       type: "array",
//       label: "Links",
//       maxRows: 3,
//       fields: [
//         {
//           name: "linkType",
//           type: "select",
//           label: "Link Type",
//           defaultValue: "button",
//           options: [
//             {
//               label: "Button",
//               value: "button",
//             },
//             {
//               label: "Normal Link",
//               value: "link",
//             },
//           ],
//           required: true,
//         },
//         {
//           name: "label",
//           type: "text",
//           label: "Label",
//           required: true,
//         },
//         {
//           name: "url",
//           type: "text",
//           label: "URL",
//         },
//         {
//           name: "reference",
//           type: "relationship",
//           label: "Reference",
//           relationTo: ["pages"], // Add your collection names here
//         },
//         {
//           name: "newTab",
//           type: "checkbox",
//           label: "Open in New Tab",
//           defaultValue: false,
//         },
//         {
//           name: "buttonVariant",
//           type: "select",
//           label: "Button Variant",
//           defaultValue: "primary",
//           admin: {
//             condition: (_, siblingData) => siblingData?.linkType === "button",
//           },
//           options: [
//             {
//               label: "Primary",
//               value: "primary",
//             },
//             {
//               label: "Secondary",
//               value: "secondary",
//             },
//             {
//               label: "Outline",
//               value: "outline",
//             },
//             {
//               label: "Ghost",
//               value: "ghost",
//             },
//             {
//               label: "Link Style",
//               value: "link-style",
//             },
//           ],
//         },
//         {
//           name: "buttonColor",
//           type: "select",
//           label: "Button Color",
//           defaultValue: "default",
//           admin: {
//             condition: (_, siblingData) => siblingData?.linkType === "button",
//           },
//           options: [
//             {
//               label: "Default",
//               value: "default",
//             },
//             {
//               label: "Brand",
//               value: "brand",
//             },
//             {
//               label: "Success",
//               value: "success",
//             },
//             {
//               label: "Danger",
//               value: "danger",
//             },
//             {
//               label: "Warning",
//               value: "warning",
//             },
//             {
//               label: "Info",
//               value: "info",
//             },
//             {
//               label: "Dark",
//               value: "dark",
//             },
//             {
//               label: "Light",
//               value: "light",
//             },
//           ],
//         },
//         {
//           name: "buttonSize",
//           type: "select",
//           label: "Button Size",
//           defaultValue: "medium",
//           admin: {
//             condition: (_, siblingData) => siblingData?.linkType === "button",
//           },
//           options: [
//             {
//               label: "Small",
//               value: "small",
//             },
//             {
//               label: "Medium",
//               value: "medium",
//             },
//             {
//               label: "Large",
//               value: "large",
//             },
//           ],
//         },
//         {
//           name: "icon",
//           type: "text",
//           label: "Icon (optional)",
//           admin: {
//             condition: (_, siblingData) => siblingData?.linkType === "button",
//             description: "Icon name or class (e.g., 'arrow-right', 'download')",
//           },
//         },
//         {
//           name: "iconPosition",
//           type: "select",
//           label: "Icon Position",
//           defaultValue: "right",
//           admin: {
//             condition: (_, siblingData) => siblingData?.linkType === "button" && siblingData?.icon,
//           },
//           options: [
//             {
//               label: "Left",
//               value: "left",
//             },
//             {
//               label: "Right",
//               value: "right",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: "media",
//       type: "upload",
//       admin: {
//         condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type as string),
//       },
//       relationTo: "media",
//       required: true,
//     },
//     {
//       name: "reversed",
//       label: "Reverse photo and text",
//       type: "checkbox",
//       admin: {
//         condition: (_, { type } = {}) => ["mediumImpact"].includes(type as string),
//       },
//       required: true,
//     },
//   ],
//   label: false,
// };

import { defaultLexical } from "@/fields/defaultLexical";

import type { Field } from "payload";

export const hero: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "lowImpact",
      label: "Type",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "High Impact",
          value: "highImpact",
        },
        {
          label: "Medium Impact",
          value: "mediumImpact",
        },
        {
          label: "Low Impact",
          value: "lowImpact",
        },
      ],
      required: true,
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: true,
      localized: true,
    },
    {
      name: "subheading",
      type: "textarea",
      label: "Subheading",
      localized: true,
    },
    {
      name: "richText",
      type: "richText",
      editor: defaultLexical,
      localized: true,
      label: "Description",
    },
    {
      name: "links",
      type: "array",
      label: "Links",
      maxRows: 3,
      fields: [
        {
          name: "linkType",
          type: "select",
          label: "Link Type",
          defaultValue: "button",
          options: [
            {
              label: "Button",
              value: "button",
            },
            {
              label: "Normal Link",
              value: "link",
            },
          ],
          required: true,
        },
        {
          name: "label",
          type: "text",
          label: "Label",
          required: true,
        },
        {
          name: "url",
          type: "text",
          label: "URL",
        },
        {
          name: "reference",
          type: "relationship",
          label: "Reference",
          relationTo: ["pages"],
        },
        {
          name: "newTab",
          type: "checkbox",
          label: "Open in New Tab",
          defaultValue: false,
        },
        {
          name: "buttonVariant",
          type: "select",
          label: "Button Variant",
          defaultValue: "primary",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "button",
          },
          options: [
            {
              label: "Solid",
              value: "solid",
            },
            {
              label: "Outline",
              value: "outline",
            },
            {
              label: "Ghost",
              value: "ghost",
            },
          ],
        },
        {
          name: "buttonColor",
          type: "text",
          label: "Button Background Color (hex or CSS color)",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "button",
            placeholder: "#ff6b35",
          },
        },
        {
          name: "buttonTextColor",
          type: "text",
          label: "Button Text Color (hex or CSS color)",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "button",
            placeholder: "#ffffff",
          },
        },
        {
          name: "buttonSize",
          type: "select",
          label: "Button Size",
          defaultValue: "medium",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "button",
          },
          options: [
            {
              label: "Small",
              value: "small",
            },
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Large",
              value: "large",
            },
          ],
        },
        {
          name: "buttonRounded",
          type: "select",
          label: "Button Roundness",
          defaultValue: "full",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "button",
          },
          options: [
            {
              label: "None",
              value: "none",
            },
            {
              label: "Small",
              value: "sm",
            },
            {
              label: "Medium",
              value: "md",
            },
            {
              label: "Large",
              value: "lg",
            },
            {
              label: "Full",
              value: "full",
            },
          ],
        },
        {
          name: "icon",
          type: "text",
          label: "Icon (optional)",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "button",
            description: "Icon name or class (e.g., 'arrow-right', 'download')",
          },
        },
        {
          name: "iconPosition",
          type: "select",
          label: "Icon Position",
          defaultValue: "right",
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === "button" && siblingData?.icon,
          },
          options: [
            {
              label: "Left",
              value: "left",
            },
            {
              label: "Right",
              value: "right",
            },
          ],
        },
      ],
    },
    {
      name: "media",
      type: "upload",
      admin: {
        condition: (_, { type } = {}) => ["highImpact", "mediumImpact"].includes(type as string),
      },
      relationTo: "media",
      required: true,
    },
    {
      name: "reversed",
      label: "Reverse photo and text",
      type: "checkbox",
      admin: {
        condition: (_, { type } = {}) => ["mediumImpact"].includes(type as string),
      },
      defaultValue: false,
    },
    {
      type: "collapsible",
      label: "Layout & Styling",
      fields: [
        {
          name: "contentAlignment",
          type: "select",
          label: "Content Alignment",
          defaultValue: "left",
          options: [
            {
              label: "Left",
              value: "left",
            },
            {
              label: "Center",
              value: "center",
            },
            {
              label: "Right",
              value: "right",
            },
          ],
        },
        {
          name: "verticalAlignment",
          type: "select",
          label: "Vertical Alignment",
          defaultValue: "center",
          options: [
            {
              label: "Top",
              value: "top",
            },
            {
              label: "Center",
              value: "center",
            },
            {
              label: "Bottom",
              value: "bottom",
            },
          ],
        },
        {
          name: "minHeight",
          type: "select",
          label: "Minimum Height",
          defaultValue: "80vh",
          options: [
            {
              label: "50vh",
              value: "50vh",
            },
            {
              label: "60vh",
              value: "60vh",
            },
            {
              label: "70vh",
              value: "70vh",
            },
            {
              label: "80vh",
              value: "80vh",
            },
            {
              label: "90vh",
              value: "90vh",
            },
            {
              label: "100vh",
              value: "100vh",
            },
          ],
        },
        {
          name: "contentMaxWidth",
          type: "text",
          label: "Content Max Width (px or CSS value)",
          admin: {
            placeholder: "800px",
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Background & Overlay",
      fields: [
        {
          name: "backgroundColor",
          type: "text",
          label: "Background Color (if no media)",
          admin: {
            placeholder: "#1a1a1a",
          },
        },
        {
          name: "enableOverlay",
          type: "checkbox",
          label: "Enable Overlay on Media",
          defaultValue: true,
        },
        {
          name: "overlayColor",
          type: "text",
          label: "Overlay Color",
          admin: {
            condition: (_, siblingData) => siblingData?.enableOverlay,
            placeholder: "#000000",
          },
        },
        {
          name: "overlayOpacity",
          type: "number",
          label: "Overlay Opacity (0-1)",
          min: 0,
          max: 1,
          admin: {
            condition: (_, siblingData) => siblingData?.enableOverlay,
            placeholder: "0.5",
            step: 0.1,
          },
        },
      ],
    },
    {
      type: "collapsible",
      label: "Typography",
      fields: [
        {
          name: "headingSize",
          type: "select",
          label: "Heading Size",
          defaultValue: "large",
          options: [
            {
              label: "Small (text-3xl/4xl/5xl)",
              value: "small",
            },
            {
              label: "Medium (text-4xl/5xl/6xl)",
              value: "medium",
            },
            {
              label: "Large (text-5xl/6xl/7xl)",
              value: "large",
            },
            {
              label: "Extra Large (text-6xl/7xl/8xl)",
              value: "xlarge",
            },
          ],
        },
        {
          name: "headingWeight",
          type: "select",
          label: "Heading Weight",
          defaultValue: "bold",
          options: [
            {
              label: "Normal",
              value: "normal",
            },
            {
              label: "Medium",
              value: "medium",
            },
            {
              label: "Semibold",
              value: "semibold",
            },
            {
              label: "Bold",
              value: "bold",
            },
            {
              label: "Extrabold",
              value: "extrabold",
            },
          ],
        },
        {
          name: "headingColor",
          type: "text",
          label: "Heading Color",
          admin: {
            placeholder: "#ffffff",
          },
        },
        {
          name: "subheadingSize",
          type: "select",
          label: "Subheading Size",
          defaultValue: "medium",
          options: [
            {
              label: "Small (text-sm/base)",
              value: "small",
            },
            {
              label: "Medium (text-base/lg)",
              value: "medium",
            },
            {
              label: "Large (text-lg/xl)",
              value: "large",
            },
          ],
        },
        {
          name: "subheadingColor",
          type: "text",
          label: "Subheading Color",
          admin: {
            placeholder: "#e5e5e5",
          },
        },
        {
          name: "subheadingStyle",
          type: "select",
          label: "Subheading Style",
          defaultValue: "normal",
          options: [
            {
              label: "Normal",
              value: "normal",
            },
            {
              label: "Italic",
              value: "italic",
            },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Spacing",
      fields: [
        {
          name: "headingMarginBottom",
          type: "select",
          label: "Heading Margin Bottom",
          defaultValue: "4",
          options: [
            { label: "Small (1rem)", value: "4" },
            { label: "Medium (1.5rem)", value: "6" },
            { label: "Large (2rem)", value: "8" },
          ],
        },
        {
          name: "subheadingMarginBottom",
          type: "select",
          label: "Subheading Margin Bottom",
          defaultValue: "6",
          options: [
            { label: "Small (1rem)", value: "4" },
            { label: "Medium (1.5rem)", value: "6" },
            { label: "Large (2rem)", value: "8" },
          ],
        },
      ],
    },
  ],
  label: false,
};
