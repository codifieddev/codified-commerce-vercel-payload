"use client";
import React from "react";

type CTABlock = {
  id?: string;
  blockType: string;
  label?: string;
  url?: string;
  style?: string;
  [key: string]: any;
};

export function EditableCTA({
  value,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  value: CTABlock;
  onChange: (updates: Partial<CTABlock>) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Call to Action</span>
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
            Button Text
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={value.label || ''}
            onChange={(e) => onChange({ label: e.target.value })}
            placeholder="Click here"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="url"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={value.url || ''}
            onChange={(e) => onChange({ url: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Style
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={value.style || 'primary'}
            onChange={(e) => onChange({ style: e.target.value })}
          >
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
          </select>
        </div>
      </div>
    </div>
  );
}
