"use client";
import React from "react";
import { cn } from "@/utilities/cn";

export function EditorToolbar({
  isEdit,
  hasChanges,
  isSaving,
  onEditToggle,
  onSave,
  onCancel,
}: {
  isEdit: boolean;
  hasChanges: boolean;
  isSaving: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-black/90 px-4 py-3 text-white shadow-lg backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          className={cn(
            "rounded-md border px-4 py-2 font-medium transition-colors",
            isEdit
              ? "border-blue-500 bg-blue-600 hover:bg-blue-700"
              : "border-gray-600 bg-gray-700 hover:bg-gray-600",
          )}
          onClick={onEditToggle}
          disabled={isSaving}
        >
          {isEdit ? "👁️ View Mode" : "✏️ Edit Page"}
        </button>

        {isEdit && (
          <span className="text-sm text-gray-300">{hasChanges ? "● Unsaved changes" : "✓ No changes"}</span>
        )}
      </div>

      {isEdit && (
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-gray-500 bg-gray-600 px-4 py-2 transition-colors hover:bg-gray-500"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className={cn(
              "flex items-center gap-2 rounded-md border px-4 py-2 font-medium transition-colors",
              hasChanges && !isSaving
                ? "border-green-500 bg-green-600 hover:bg-green-700"
                : "cursor-not-allowed border-green-800 bg-green-900",
            )}
            onClick={onSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              "💾 Save Changes"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
