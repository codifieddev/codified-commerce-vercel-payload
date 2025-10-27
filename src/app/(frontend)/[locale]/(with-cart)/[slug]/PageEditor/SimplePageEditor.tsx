"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EditorToolbar } from "./Toolbar";
import { InlineEditableHero } from "@/components/heros/InlineEditableHero";
import { EditableBlocks } from "./blocks/EditableBlocks";

type PageDoc = {
  id: string;
  title?: string | null;
  slug?: string | null;
  hero?: any;
  layout?: any[] | null;
  [key: string]: any;
};

export function SimplePageEditor({ 
  page, 
  children 
}: { 
  page: PageDoc;
  children: React.ReactNode;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [draft, setDraft] = useState<PageDoc>(() => ({ ...page }));
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  
  const hasChanges = useMemo(() => {
    return JSON.stringify(draft.hero) !== JSON.stringify(page.hero) ||
           JSON.stringify(draft.layout) !== JSON.stringify(page.layout);
  }, [draft, page]);

  const onSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          hero: draft.hero,
          layout: draft.layout,
        }),
      });
      
      if (res.ok) {
        setIsEdit(false);
        router.refresh();
        console.log("Page saved successfully");
      } else {
        const result = await res.json();
        console.error("Failed to save page:", result.error);
        alert(`Failed to save: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Network error occurred while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const onCancel = () => {
    setDraft({ ...page });
    setIsEdit(false);
  };

  return (
    <>
      <EditorToolbar
        isEdit={isEdit}
        hasChanges={hasChanges}
        isSaving={isSaving}
        onEditToggle={() => setIsEdit((v) => !v)}
        onSave={onSave}
        onCancel={onCancel}
      />

      {isEdit ? (
        <div className="pt-20 pb-24 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Editing: {page.title || page.slug || 'Untitled Page'}
              </h2>
              
              <InlineEditableHero
                hero={draft.hero || null}
                onSave={(v) => setDraft((d) => ({ ...d, hero: v }))}
                isEditable={true}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <EditableBlocks
                value={draft.layout || []}
                onChange={(v) => setDraft((d) => ({ ...d, layout: v }))}
              />
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
