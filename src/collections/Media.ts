import path from "path";
import { fileURLToPath } from "url";

import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";

import type { Access, CollectionConfig } from "payload";
import { isAdmin, isManager } from "@/access/hasRole";

const filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(filename);

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
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: adminacess,
    delete: adminacess,
    read: adminacess,
    update: adminacess,
  },
  labels: {
    singular: {
      en: "Media",
      pl: "Plik",
    },
    plural: {
      en: "Media",
      pl: "Pliki",
    },
  },
  admin: {
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
        },
      }),
      localized: true,
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "square",
        width: 500,
        height: 500,
      },
      {
        name: "small",
        width: 600,
      },
      {
        name: "medium",
        width: 900,
      },
      {
        name: "large",
        width: 1400,
      },
      {
        name: "xlarge",
        width: 1920,
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        crop: "center",
      },
    ],
  },
};
