"use client";
import React, { useState } from "react";

type ContentBlock = {
  id?: string;
  blockType: string;
  richText?: string;
  [key: string]: any;
};

export function InlineEditableContent({
  value,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  value: ContentBlock;
  onChange: (updates: Partial<ContentBlock>) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(value.richText || "");

  const handleSave = () => {
    onChange({ richText: content });
    setEditMode(false);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Content Block</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded" onClick={onMoveUp}>↑</button>
          <button className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded" onClick={onMoveDown}>↓</button>
          <button className="px-2 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded" onClick={onRemove}>×</button>
        </div>
      </div>
      {editMode ? (
        <div>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your content here..."
          />
          <div className="mt-2 flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
            <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="min-h-[48px]" onClick={() => setEditMode(true)}>
            {value.richText ? (
              <div className="whitespace-pre-line text-gray-800 cursor-pointer">{value.richText}</div>
            ) : (
              <span className="text-gray-400 cursor-pointer">Click to add content...</span>
            )}
          </div>
          <button
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
