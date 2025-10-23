import { ComponentConfig } from "@measured/puck";
import React from "react";

export const Text: ComponentConfig = {
  label: "Text",
  fields: {
    content: {
      type: "textarea",
      label: "Content",
    },
    textType: {
      type: "select",
      label: "Text Type",
      options: [
        { label: "Paragraph", value: "p" },
        { label: "Heading 1", value: "h1" },
        { label: "Heading 2", value: "h2" },
        { label: "Heading 3", value: "h3" },
        { label: "Heading 4", value: "h4" },
        { label: "Heading 5", value: "h5" },
        { label: "Heading 6", value: "h6" },
      ],
    },
    color: {
      type: "text",
      label: "Text Color",
    },
    size: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Extra Small", value: "12px" },
        { label: "Small", value: "14px" },
        { label: "Medium", value: "16px" },
        { label: "Large", value: "20px" },
        { label: "Extra Large", value: "24px" },
        { label: "2XL", value: "32px" },
        { label: "3XL", value: "40px" },
      ],
    },
    weight: {
      type: "select",
      label: "Font Weight",
      options: [
        { label: "Light", value: "300" },
        { label: "Normal", value: "400" },
        { label: "Medium", value: "500" },
        { label: "Semi Bold", value: "600" },
        { label: "Bold", value: "700" },
      ],
    },
    align: {
      type: "radio",
      label: "Text Align",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
      ],
    },
  },
  defaultProps: {
    content: "Enter your text here",
    textType: "p",
    color: "#000000",
    size: "16px",
    weight: "400",
    align: "left",
  },
  render: ({ content, textType, color, size, weight, align }) => {
    const Tag = textType as keyof React.JSX.IntrinsicElements;
    return (
      <Tag
        style={{
          color,
          fontSize: size,
          fontWeight: weight,
          textAlign: align as any,
          margin: 0,
          padding: "8px 0",
        }}
      >
        {content}
      </Tag>
    );
  },
};
