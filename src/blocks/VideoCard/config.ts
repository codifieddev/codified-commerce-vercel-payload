import { defaultLexical } from "@/fields/defaultLexical";
import { linkGroup } from "@/fields/linkGroup";
import { marginFields, paddingFields } from "@/fields/spacingFields";

import type { Block } from "payload";

export const VideoCard: Block = {
  slug: "vdc",
  interfaceName: "VideoCardBlock",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      label: false,
    },
    {
      name: "other_info",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
        },
        {
          name: "value",
          type: "text",
        },
        {
          name: "icon",
          type: "text",
        },
      ],
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

    marginFields,
    paddingFields,
  ],
  labels: {
    plural: "Videos Card",
    singular: "Video Card",
  },
};
