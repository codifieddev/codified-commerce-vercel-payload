"use client";
import React from "react";
import { InlineEditableContent } from "./types/InlineEditableContent";
import { EditableMediaBlock } from "./types/EditableMediaBlock";
import { EditableCTA } from "./types/EditableCTA";
import { EditableContent2Col } from "./types/EditableContent2Col";
import type { Content2ColBlock } from "./types/EditableContent2Col";
import { EditableVideoCard } from "./types/EditableVideoCard";

type Block = { 
  id?: string; 
  blockType: string; 
  [key: string]: any; 
};

// Use imported Content2ColBlock type

// Define specific block types
type ContentBlock = Block & { richText?: string };
type MediaBlock = Block & { media?: any; caption?: string; alignment?: string };
type CTABlock = Block & { label?: string; url?: string; style?: string };

export function EditableBlocks({
  value,
  onChange,
}: {
  value: Block[];
  onChange: (v: Block[]) => void;
}) {
  const blocks = value || [];

  const addBlock = (blockType: string) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      blockType,
      ...(blockType === "content" && { richText: "" }),
      ...(blockType === "mediaBlock" && { 
        media: null, 
        caption: "", 
        alignment: "center" 
      }),
      ...(blockType === "callToAction" && { 
        label: "Click here", 
        url: "#", 
        style: "primary" 
      }),
      ...(blockType === "content2Col" && {
        leftText: "",
        rightText: ""
      }),
      ...(blockType === "videoCard" && {
        title: "",
        other_info: [],
        links: [],
      }),
    };

    onChange([...blocks, newBlock]);
  };

  const updateBlock = (index: number, updates: Partial<Block>) => {
    const newBlocks = blocks.map((block, i) => 
      i === index ? { ...block, ...updates } : block
    );
    onChange(newBlocks);
  };

  const removeBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    onChange(newBlocks);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Content Blocks</h3>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            onClick={() => addBlock("content")}
          >
            + Content
          </button>
          <button
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
            onClick={() => addBlock("mediaBlock")}
          >
            + Media
          </button>
          <button
            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
            onClick={() => addBlock("callToAction")}
          >
            + CTA
          </button>
          <button
            className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
            onClick={() => addBlock("content2Col")}
          >
            + 2-Column Content
          </button>
          <button
            className="px-3 py-1 text-sm bg-pink-100 text-pink-700 rounded hover:bg-pink-200"
            onClick={() => addBlock("videoCard")}
          >
            + Video Card
          </button>
        </div>
      </div>

      {blocks.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">No content blocks yet</p>
          <p className="text-sm text-gray-500">Add blocks using the buttons above</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => {
            const commonProps = {
              onMoveUp: () => moveBlock(index, -1),
              onMoveDown: () => moveBlock(index, 1),
              onRemove: () => removeBlock(index),
            };

            switch (block.blockType) {
              case "content":
                return (
                  <InlineEditableContent
                    key={block.id || index}
                    value={block as ContentBlock}
                    onChange={(updates) => updateBlock(index, updates)}
                    {...commonProps}
                  />
                );
              case "mediaBlock":
                return (
                  <EditableMediaBlock
                    key={block.id || index}
                    value={block as MediaBlock}
                    onChange={(updates) => updateBlock(index, updates)}
                    {...commonProps}
                  />
                );
              case "callToAction":
                return (
                  <EditableCTA
                    key={block.id || index}
                    value={block as CTABlock}
                    onChange={(updates) => updateBlock(index, updates)}
                    {...commonProps}
                  />
                );
              case "content2Col":
                return (
                  <EditableContent2Col
                    key={block.id || index}
                    value={block as Content2ColBlock}
                    onChange={(updates) => updateBlock(index, updates)}
                    {...commonProps}
                  />
                );
              case "videoCard":
                return (
                  <EditableVideoCard
                    key={block.id || index}
                    value={block as any}
                    onChange={(updates) => updateBlock(index, updates)}
                    {...commonProps}
                  />
                );
              default:
                return (
                  <div key={index} className="border border-gray-300 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Unsupported block: {block.blockType}
                      </span>
                      <button
                        className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                        onClick={() => removeBlock(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
            }
          })}
        </div>
      )}
    </div>
  );
}
