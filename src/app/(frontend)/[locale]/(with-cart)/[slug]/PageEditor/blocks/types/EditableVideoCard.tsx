import React from "react";

type OtherInfo = {
  label: string;
  value: string;
  icon?: string;
};

type Link = {
  label: string;
  url: string;
};

type VideoCardBlock = {
  id?: string;
  blockType: "videoCard";
  title: string;
  other_info: OtherInfo[];
  links: Link[];
};

type Props = {
  value: VideoCardBlock;
  onChange: (updates: Partial<VideoCardBlock>) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

export const EditableVideoCard: React.FC<Props> = ({ value, onChange, onMoveUp, onMoveDown, onRemove }) => {
  const updateField = (field: keyof VideoCardBlock, newValue: any) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-700">Video Card</span>
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={onMoveUp}>↑</button>
          <button className="px-2 py-1 text-xs bg-gray-100 rounded" onClick={onMoveDown}>↓</button>
          <button className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded" onClick={onRemove}>Remove</button>
        </div>
      </div>
      <div className="mb-2">
        <input
          className="w-full border rounded p-2 text-sm mb-2"
          value={value.title}
          onChange={e => updateField("title", e.target.value)}
          placeholder="Video card title..."
        />
      </div>
      {/* Other Info */}
      <div className="mb-2">
        <span className="text-xs font-semibold">Other Info</span>
        {value.other_info.map((info, idx) => (
          <div key={idx} className="flex gap-2 mb-1">
            <input
              className="border rounded p-1 text-xs"
              value={info.label}
              onChange={e => {
                const updated = [...value.other_info];
                updated[idx].label = e.target.value;
                updateField("other_info", updated);
              }}
              placeholder="Label"
            />
            <input
              className="border rounded p-1 text-xs"
              value={info.value}
              onChange={e => {
                const updated = [...value.other_info];
                updated[idx].value = e.target.value;
                updateField("other_info", updated);
              }}
              placeholder="Value"
            />
            <input
              className="border rounded p-1 text-xs"
              value={info.icon || ""}
              onChange={e => {
                const updated = [...value.other_info];
                updated[idx].icon = e.target.value;
                updateField("other_info", updated);
              }}
              placeholder="Icon"
            />
          </div>
        ))}
        <button
          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
          onClick={() => updateField("other_info", [...value.other_info, { label: "", value: "", icon: "" }])}
        >
          + Add Info
        </button>
      </div>
      {/* Links */}
      <div>
        <span className="text-xs font-semibold">Links</span>
        {value.links.map((link, idx) => (
          <div key={idx} className="flex gap-2 mb-1">
            <input
              className="border rounded p-1 text-xs"
              value={link.label}
              onChange={e => {
                const updated = [...value.links];
                updated[idx].label = e.target.value;
                updateField("links", updated);
              }}
              placeholder="Label"
            />
            <input
              className="border rounded p-1 text-xs"
              value={link.url}
              onChange={e => {
                const updated = [...value.links];
                updated[idx].url = e.target.value;
                updateField("links", updated);
              }}
              placeholder="URL"
            />
          </div>
        ))}
        <button
          className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
          onClick={() => updateField("links", [...value.links, { label: "", url: "" }])}
        >
          + Add Link
        </button>
      </div>
    </div>
  );
};
