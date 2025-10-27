import React from "react";

export type Content2ColBlock = {
  id?: string;
  blockType: "content2Col";
  leftText: string;
  rightText: string;
};

type Props = {
  value: Content2ColBlock;
  onChange: (updates: Partial<Content2ColBlock>) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

export const EditableContent2Col: React.FC<Props> = ({
  value,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-700">2-Column Content</span>
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={onMoveUp}>↑</button>
          <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={onMoveDown}>↓</button>
          <button className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded" onClick={onRemove}>Remove</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <textarea
          className="w-full border rounded p-2 text-sm"
          value={value.leftText}
          onChange={e => onChange({ leftText: e.target.value })}
          placeholder="Left column text..."
          rows={4}
        />
        <textarea
          className="w-full border rounded p-2 text-sm"
          value={value.rightText}
          onChange={e => onChange({ rightText: e.target.value })}
          placeholder="Right column text..."
          rows={4}
        />
      </div>
    </div>
  );
};
