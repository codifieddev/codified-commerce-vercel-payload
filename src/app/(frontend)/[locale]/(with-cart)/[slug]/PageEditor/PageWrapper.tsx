"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import server components to avoid server/client boundary issues
const RenderBlocks = dynamic(
  () => import("@/blocks/RenderBlocks").then(mod => ({ default: mod.RenderBlocks })),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded"></div>
  }
);

const RenderHero = dynamic(
  () => import("@/components/heros/RenderHero").then(mod => ({ default: mod.RenderHero })),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded"></div>
  }
);

type PageData = {
  hero?: any;
  layout?: any[] | null;
};

export function PageViewMode({ hero, layout }: PageData) {
  return (
    <article className="pt-16 pb-24">
      {hero && <RenderHero {...hero} />}
      {layout && layout.length > 0 && <RenderBlocks blocks={layout} />}
      {(!layout || layout.length === 0) && !hero && (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-gray-600">This page has no content yet. Use edit mode to add content.</p>
        </div>
      )}
    </article>
  );
}
