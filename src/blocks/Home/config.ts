import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "heroBlock",
  interfaceName: "HeroBlock",
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
  fields: [
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Background Image",
      admin: {
        description: "Upload hero background image",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Hero Title",
      admin: {
        description: 'Main heading text (e.g., "Izuzetna oštrina nadomak ruke")',
      },
    },
    {
      name: "subtitle",
      type: "textarea",
      required: false,
      label: "Subtitle",
      admin: {
        description: "Supporting text below the title",
      },
    },
    {
      name: "primaryButton",
      type: "group",
      label: "Primary Button",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          defaultValue: "Kontaktirajte",
        },
        {
          name: "link",
          type: "text",
          required: true,
          defaultValue: "#contact",
        },
      ],
    },
    {
      name: "videoPopup",
      type: "group",
      label: "Video Popup",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          defaultValue: true,
          label: "Enable Video Popup",
        },
        {
          name: "youtubeUrl",
          type: "text",
          required: false,
          label: "YouTube Video URL",
          admin: {
            description: "Full YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)",
            condition: (data, siblingData) => siblingData?.enabled === true,
          },
        },
      ],
    },
    {
      name: "containerWidth",
      type: "select",
      defaultValue: "80",
      options: [
        { label: "70%", value: "70" },
        { label: "80%", value: "80" },
        { label: "90%", value: "90" },
        { label: "100%", value: "100" },
      ],
      label: "Container Width",
    },
  ],
};

export const VideosBlock: Block = {
  slug: "videosBlock",
  interfaceName: "VideosBlock",
  labels: {
    singular: "Videos Section",
    plural: "Videos Sections",
  },
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      required: false,
      label: "Section Title",
    },
    {
      name: "videos",
      type: "array",
      minRows: 1,
      maxRows: 2,
      label: "Video Items",
      fields: [
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          required: true,
          label: "Background Image",
        },
        {
          name: "title",
          type: "text",
          required: true,
          label: "Video Title",
        },
        {
          name: "blurbs",
          type: "array",
          minRows: 2,
          maxRows: 2,
          label: "Info Blurbs",
          fields: [
            {
              name: "icon",
              type: "text",
              required: false,
              label: "Icon Name (optional)",
            },
            {
              name: "text",
              type: "text",
              required: true,
              label: "Blurb Text",
            },
          ],
        },
        {
          name: "button",
          type: "group",
          label: "Call to Action",
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
            },
            {
              name: "link",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

export const ProductCatalogBlock: Block = {
  slug: "productCatalogBlock",
  interfaceName: "ProductCatalogBlock",
  labels: {
    singular: "Product Catalog",
    plural: "Product Catalogs",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Section Title",
    },
    {
      name: "description",
      type: "textarea",
      required: false,
      label: "Description",
    },
    {
      name: "categories",
      type: "array",
      label: "Product Categories",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Category Name",
        },
        {
          name: "slug",
          type: "text",
          required: true,
          label: "Category Slug",
        },
      ],
    },
    {
      name: "products",
      type: "array",
      label: "Products",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Product Name",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "price",
          type: "text",
          required: true,
          label: "Price (e.g., EUR 220.00)",
        },
        {
          name: "category",
          type: "text",
          required: true,
          label: "Category Slug",
          admin: {
            description: "Must match one of the category slugs above",
          },
        },
      ],
    },
  ],
};

export const TestimonialBlock: Block = {
  slug: "testimonialBlock",
  interfaceName: "TestimonialBlock",
  labels: {
    singular: "Testimonial Section",
    plural: "Testimonial Sections",
  },
  fields: [
    {
      name: "sectionTitle",
      type: "text",
      required: false,
      label: "Section Title",
    },
    {
      name: "testimonials",
      type: "array",
      minRows: 1,
      label: "Testimonials",
      fields: [
        {
          name: "preText",
          type: "textarea",
          required: true,
          label: "Pre Text",
          admin: {
            description: "Opening text of testimonial",
          },
        },
        {
          name: "midText",
          type: "textarea",
          required: false,
          label: "Middle Text",
          admin: {
            description: "Main testimonial content",
          },
        },
        {
          name: "postText",
          type: "textarea",
          required: false,
          label: "Post Text",
          admin: {
            description: "Closing text of testimonial",
          },
        },
        {
          name: "authorName",
          type: "text",
          required: true,
          label: "Author Name",
        },
        {
          name: "authorImage",
          type: "upload",
          relationTo: "media",
          required: false,
          label: "Author Image",
        },
        {
          name: "authorTitle",
          type: "text",
          required: false,
          label: "Author Title/Position",
        },
      ],
    },
  ],
};
