"use client";
import React from "react";

export function EditableHero({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => void;
}) {
  if (!value) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Hero Section</h3>
        <p className="text-gray-600 mb-4">Add a hero section to make your page stand out</p>
        <button
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => onChange({ type: 'default', title: '', subtitle: '' })}
        >
          Add Hero Section
        </button>
      </div>
    );
  }

  const updateField = (field: string, newValue: any) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Hero Section</h3>
        <button
          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
          onClick={() => onChange(null)}
        >
          Remove Hero
        </button>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hero Type
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={value.type || 'default'}
            onChange={(e) => updateField('type', e.target.value)}
          >
            <option value="default">Default</option>
            <option value="centered">Centered</option>
            <option value="split">Split</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={value.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Enter hero title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={value.subtitle || ''}
            onChange={(e) => updateField('subtitle', e.target.value)}
            placeholder="Enter hero subtitle or description"
          />
        </div>
      </div>
    </div>
  );
}
