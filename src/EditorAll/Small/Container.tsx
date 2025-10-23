// components/puck/Container.tsx
import { ComponentConfig, Content } from "@measured/puck";

export const Container: ComponentConfig = {
  label: "Container",
  fields: {
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    padding: {
      type: "select",
      label: "Padding",
      options: [
        { label: "None", value: "0" },
        { label: "Small", value: "16px" },
        { label: "Medium", value: "32px" },
        { label: "Large", value: "48px" },
      ],
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      options: [
        { label: "Small (640px)", value: "640px" },
        { label: "Medium (768px)", value: "768px" },
        { label: "Large (1024px)", value: "1024px" },
        { label: "Extra Large (1280px)", value: "1280px" },
        { label: "Full", value: "100%" },
      ],
    },
    borderRadius: {
      type: "text",
      label: "Border Radius (px)",
    },
    text: {
      type: "slot",
    },
  },
  defaultProps: {
    backgroundColor: "#f3f4f6",
    padding: "32px",
    maxWidth: "1024px",
    borderRadius: "8",
  },
  render: ({ backgroundColor, padding, maxWidth, borderRadius, text: Text }) => {
    return (
      <div
        style={{
          backgroundColor,
          padding,
          maxWidth,
          margin: "0 auto",
          borderRadius: `${borderRadius}px`,
        }}
      >
        {/* <p style={{ margin: 0 }}> */}
        <Text />
        {/* </p> */}
      </div>
    );
  },
};
