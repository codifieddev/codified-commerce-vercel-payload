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
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur text-white px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <button
          className={cn(
            "px-4 py-2 rounded-md border transition-colors font-medium",
            isEdit 
              ? "bg-blue-600 border-blue-500 hover:bg-blue-700" 
              : "bg-gray-700 border-gray-600 hover:bg-gray-600"
          )}
          onClick={onEditToggle}
          disabled={isSaving}
        >
          {isEdit ? "👁️ View Mode" : "✏️ Edit Page"}
        </button>
        
        {isEdit && (
          <span className="text-sm text-gray-300">
            {hasChanges ? "● Unsaved changes" : "✓ No changes"}
          </span>
        )}
      </div>

      {isEdit && (
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 rounded-md bg-gray-600 border border-gray-500 hover:bg-gray-500 transition-colors"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded-md border transition-colors font-medium flex items-center gap-2",
              hasChanges && !isSaving
                ? "bg-green-600 border-green-500 hover:bg-green-700" 
                : "bg-green-900 border-green-800 cursor-not-allowed"
            )}
            onClick={onSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
