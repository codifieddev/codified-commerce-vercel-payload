import { ComponentConfig } from "@measured/puck";

export const Spacer: ComponentConfig = {
  label: "Spacer",
  fields: {
    height: {
      type: "select",
      label: "Height",
      options: [
        { label: "Extra Small (8px)", value: "8px" },
        { label: "Small (16px)", value: "16px" },
        { label: "Medium (32px)", value: "32px" },
        { label: "Large (48px)", value: "48px" },
        { label: "Extra Large (64px)", value: "64px" },
      ],
    },
  },
  defaultProps: {
    height: "32px",
  },
  render: ({ height }) => {
    return <div style={{ height, width: "100%" }} />;
  },
};
