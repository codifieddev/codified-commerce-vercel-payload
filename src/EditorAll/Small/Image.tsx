import { ComponentConfig } from "@measured/puck";

export const Image: ComponentConfig = {
  label: "Image",
  fields: {
    src: {
      type: "text",
      label: "Image URL",
    },
    alt: {
      type: "text",
      label: "Alt Text",
    },
    width: {
      type: "text",
      label: "Width",
    },
    height: {
      type: "text",
      label: "Height",
    },
    objectFit: {
      type: "select",
      label: "Object Fit",
      options: [
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
        { label: "Fill", value: "fill" },
        { label: "None", value: "none" },
      ],
    },
    borderRadius: {
      type: "text",
      label: "Border Radius (px)",
    },
  },
  defaultProps: {
    src: "https://images.unsplash.com/photo-1760625142154-0d899eacedb7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    alt: "Placeholder image",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "0",
  },
  render: ({ src, alt, width, height, objectFit, borderRadius }) => {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height,
          objectFit: objectFit as any,
          borderRadius: `${borderRadius}px`,
          display: "block",
        }}
      />
    );
  },
};
