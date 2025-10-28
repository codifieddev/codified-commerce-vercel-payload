import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";

import { HotspotBlock } from "./(ecommerce)/Hotspot/Component";
import { AccordionBlock } from "./Accordion/Component";
import { CarouselBlock } from "./Carousel/Component";

import type { Page } from "@/payload-types";
import { AboutPageRenderer } from "./About/component";
import { HeroBlock, ProductCatalogBlock, TestimonialBlock, VideosBlock } from "./Home/component";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  // code: CodeBlock,
  carousel: CarouselBlock,
  mediaBlock: MediaBlock,
  accordion: AccordionBlock,
  hotspotZone: HotspotBlock,
  aboutPage: AboutPageRenderer,
  heroBlock: HeroBlock,
  videosBlock: VideosBlock,
  productCatalogBlock: ProductCatalogBlock,
  testimonialBlock: TestimonialBlock,
};

export const RenderBlocks = ({ blocks }: { blocks: Page["layout"][0][] }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            console.log("===>>>", block);

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </>
    );
  }

  return null;
};
