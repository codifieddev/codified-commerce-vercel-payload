"use client";
import React from "react";

type ContentBlock = {
  id?: string;
  blockType: string;
  richText?: string;
  [key: string]: any;
};

export function EditableContent({
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
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Content Block</span>
        <div className="flex gap-1">
          <button
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
            onClick={onMoveUp}
          >
            ↑
          </button>
          <button
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
            onClick={onMoveDown}
          >
            ↓
          </button>
          <button
            className="px-2 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded"
            onClick={onRemove}
          >
            ×
          </button>
        </div>
      </div>
      
      <textarea
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={6}
        value={value.richText || ''}
        onChange={(e) => onChange({ richText: e.target.value })}
        placeholder="Enter your content here..."
      />
    </div>
  );
}
