import React from "react";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { RenderHero } from "@/components/heros/RenderHero";

type PageData = {
  hero?: any;
  layout?: any[] | null;
};

export function ServerPageView({ hero, layout }: PageData) {
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
