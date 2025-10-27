
import { authenticated } from "@/access/authenticated";
import { isAdmin } from "@/access/hasRole";

import type { CollectionConfig } from "payload";

export const Administrators: CollectionConfig = {
  slug: "administrators",
  labels: {
    singular: {
      en: "Administrator",
      pl: "Administrator",
    },
    plural: {
      en: "Administrators",
      pl: "Administratorzy",
    },
  },
  access: {
    admin: authenticated, // can see in admin UI if authenticated
    read: authenticated, // all authenticated can read
    create: isAdmin, // only admins can create
    update: isAdmin, // only admins can update
    delete: isAdmin, // only admins can delete
  },
  admin: {
  defaultColumns: ["name", "email", "role.name", "role.permissions"],
    useAsTitle: "name",
    group: {
      en: "Page Settings",
      pl: "Ustawienia strony",
    },
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "relationship",
  relationTo: ["roles"],
      required: true,
    }
  ],
  timestamps: true,
  defaultPopulate: {
    role: {
      name: true,
      permissions: true,
    },
  },
};
