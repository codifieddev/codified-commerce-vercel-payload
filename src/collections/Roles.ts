import type { CollectionConfig } from "payload";

export const Roles: CollectionConfig = {
  slug: "roles",
  labels: {
    singular: { en: "Role" },
    plural: { en: "Roles" },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "permissions",
      type: "array",
      fields: [
        {
          name: "collection",
          type: "text",
          required: true,
        },
        {
          name: "actions",
          type: "select",
          options: [
            { label: "Create", value: "create" },
            { label: "Read", value: "read" },
            { label: "Update", value: "update" },
            { label: "Delete", value: "delete" },
            { label: "Admin UI", value: "admin" },
          ],
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
};
