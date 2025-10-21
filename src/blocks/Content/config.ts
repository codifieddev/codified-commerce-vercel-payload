import { AlignmentField } from "@/fields/alignmentField";
import { backgroundPicker } from "@/fields/backgroundPicker";
import { defaultLexical } from "@/fields/defaultLexical";
import { link } from "@/fields/link";
import { radiusFields } from "@/fields/radiusFields";
import { marginFields, paddingFields } from "@/fields/spacingFields";

import type { Block, Field } from "payload";
import { VideoCard } from "../VideoCard/config";

export const ProductCategoryBlock: Block = {
  slug: "product-category-block",
  labels: { singular: "Product Category Block", plural: "Product Category Blocks" },
  fields: [
    {
      name: "categories",
      type: "array",
      label: "Categories",
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: "label", type: "text", label: "Button Label", required: true },
        { name: "slug", type: "text", label: "Category Slug (for API call)", required: true },
        {
          name: "products",
          label: "Select Products",
          type: "relationship",
          relationTo: "products",
          hasMany: true,
        },
      ],
    },
  ],
};

const columnFields: Field[] = [
  {
    name: "size",
    type: "select",
    defaultValue: "oneThird",
    options: [
      {
        label: "One Sixth",
        value: "oneSixth",
      },
      {
        label: "One Third",
        value: "oneThird",
      },
      {
        label: "Half",
        value: "half",
      },
      {
        label: "Two Thirds",
        value: "twoThirds",
      },
      {
        label: "Five Sixth",
        value: "fiveSixth",
      },
      {
        label: "Full",
        value: "full",
      },
    ],
  },
  {
    name: "richText",
    type: "richText",
    editor: defaultLexical,
    localized: true,
    label: false,
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  {
    name: "enableProse",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "Select Type",
    type: "blocks",
    blocks: [VideoCard, ProductCategoryBlock],
  },
  {
    name: "Heading",
    type: "text",
  },
  {
    name: "Sub Heading",
    type: "text",
  },
  {
    name: "Description",
    type: "textarea",
  },
  paddingFields,
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
  backgroundPicker,
];

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  fields: [
    {
      name: "columns",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    {
      label: "Styling Options",
      type: "collapsible",
      fields: [AlignmentField, marginFields, paddingFields, ...radiusFields, backgroundPicker],
    },
  ],
};
