"use client";
import React from "react";

export function EditableMediaBlock({
  value,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  value: { media?: any; caption?: string; alignment?: string };
  onChange: (updates: Partial<typeof value>) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Media Block</span>
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
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Media ID
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={typeof value.media === 'object' ? value.media?.id || '' : value.media || ''}
            onChange={(e) => onChange({ media: e.target.value })}
            placeholder="Enter media ID"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caption
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={value.caption || ''}
            onChange={(e) => onChange({ caption: e.target.value })}
            placeholder="Optional caption"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alignment
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={value.alignment || 'center'}
            onChange={(e) => onChange({ alignment: e.target.value })}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>
    </div>
  );
}
