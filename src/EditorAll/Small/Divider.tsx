import { ComponentConfig } from "@measured/puck";

export const Divider: ComponentConfig = {
  label: "Divider",
  fields: {
    color: {
      type: "text",
      label: "Color",
    },
    thickness: {
      type: "select",
      label: "Thickness",
      options: [
        { label: "Thin (1px)", value: "1px" },
        { label: "Medium (2px)", value: "2px" },
        { label: "Thick (4px)", value: "4px" },
      ],
    },
    style: {
      type: "radio",
      label: "Style",
      options: [
        { label: "Solid", value: "solid" },
        { label: "Dashed", value: "dashed" },
        { label: "Dotted", value: "dotted" },
      ],
    },
  },
  defaultProps: {
    color: "#e5e7eb",
    thickness: "1px",
    style: "solid",
  },
  render: ({ color, thickness, style }) => {
    return (
      <hr
        style={{
          border: "none",
          borderTop: `${thickness} ${style} ${color}`,
          margin: "16px 0",
        }}
      />
    );
  },
};
