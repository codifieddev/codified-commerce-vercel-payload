import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { Hotspot } from "@/blocks/(ecommerce)/Hotspot/config";
import { Accordion } from "@/blocks/Accordion/config";
import { Archive } from "@/blocks/ArchiveBlock/config";
import { CallToAction } from "@/blocks/CallToAction/config";
import { Carousel } from "@/blocks/Carousel/config";
import { Content } from "@/blocks/Content/config";
import { FormBlock } from "@/blocks/Form/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { hero } from "@/components/heros/config";
import { slugField } from "@/fields/slug";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";

import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";

import type { Access, CollectionConfig } from "payload";
import { VideoCard } from "@/blocks/VideoCard/config";
import { AboutPage } from "@/blocks/About/config";
import { HeroBlock, ProductCatalogBlock, TestimonialBlock, VideosBlock } from "@/blocks/Home/config";
import { TilesviewHero } from "@/blocks/TilesviewHero/config";
import { isAdmin, isManager } from "@/access/hasRole";




// Allow admins/managers to read all, others only published
const adminacess: Access = (args) => {
  if (isAdmin(args) ) {
    return true;
  }
  // fallback to published only
  return {
    _status: {
      equals: "published",
    },
  };
};


export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: adminacess,
    delete: adminacess,
    read: adminacess,
    update: adminacess,
  },
  labels: {
    singular: {
      en: "Page",
      pl: "Strona",
    },
    plural: {
      en: "Pages",
      pl: "Strony",
    },
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          path: `/${typeof data?.slug === "string" ? data.slug : ""}`,
          locale: req.locale,
        });
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        path: `/${typeof data?.slug === "string" ? data.slug : ""}`,
        locale: req.locale,
      }),
    useAsTitle: "title",
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                Carousel,
                Accordion,
                Hotspot,
                VideoCard,
                AboutPage,
                HeroBlock,
                VideosBlock,
                ProductCatalogBlock,
                TestimonialBlock,
               TilesviewHero,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
          localized: true,
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },

    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    beforeDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
