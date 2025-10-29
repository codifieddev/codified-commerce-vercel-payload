// payload.collections/tenants.ts
import { CollectionConfig } from "payload";
import { pageAccessControl } from "../Pages";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "domains", type: "array", fields: [{ name: "domain", type: "text" }] },
    {
      name: "theme",
      type: "group",
      fields: [
        { name: "primaryColor", type: "text" },
        { name: "font", type: "text" },
      ],
    },
    { name: "settings", type: "json" },
  ],
};
