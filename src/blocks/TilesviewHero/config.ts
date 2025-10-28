import { Block } from "node_modules/payload/dist/fields/config/types";


export const TilesviewHero: Block = {
  slug: "tilesviewHero",
  fields: [
    {
      name: "mainHeading",
      type: "array",
      label: "Main Heading",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
        {
          name: "color",
          type: "text",
          label: "Text Color",
        },
      ],
    },
    {
      name: "subHeading",
      type: "text",
      label: "Subheading",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "buttonText",
      type: "text",
      label: "Button Text",
    },
    {
      name: "ratings",
      type: "array",
      label: "Ratings",
      fields: [
        {
          name: "icon",
          type: "text",
          label: "Icon (class or URL)",
        },
        {
          name: "value",
          type: "number",
          label: "Rating Value",
        },
        {
          name: "label",
          type: "text",
          label: "Rating Label",
        },
      ],
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      label: "Background Image",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
    },
  ],
};