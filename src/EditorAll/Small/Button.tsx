import { ComponentConfig } from "@measured/puck";

export const Button: ComponentConfig = {
  label: "Button",
  fields: {
    text: {
      type: "text",
      label: "Button Text",
    },
    variant: {
      type: "select",
      label: "Variant",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
      ],
    },
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    link: {
      type: "text",
      label: "Link URL",
    },
  },
  defaultProps: {
    text: "Click Me",
    variant: "primary",
    size: "md",
    backgroundColor: "#3b82f6",
    textColor: "#ffffff",
    link: "#",
  },
  render: ({ text, variant, size, backgroundColor, textColor, link }) => {
    const sizeStyles = {
      sm: { padding: "6px 12px", fontSize: "14px" },
      md: { padding: "10px 20px", fontSize: "16px" },
      lg: { padding: "14px 28px", fontSize: "18px" },
    };

    const variantStyles = {
      primary: {
        backgroundColor,
        color: textColor,
        border: "none",
      },
      secondary: {
        backgroundColor: "#6b7280",
        color: "#ffffff",
        border: "none",
      },
      outline: {
        backgroundColor: "transparent",
        color: backgroundColor,
        border: `2px solid ${backgroundColor}`,
      },
    };

    return (
      <a
        href={link}
        style={{
          display: "inline-block",
          textDecoration: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "500",
          transition: "all 0.2s",
          ...sizeStyles[size],
          ...variantStyles[variant],
        }}
      >
        {text}
      </a>
    );
  },
};
