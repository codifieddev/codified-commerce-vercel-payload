
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
  defaultColumns: ["name", "email", "role", "permissions"],
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
      name: 'role',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Manager',
          value: 'manager',
        },
      ],
      label: 'Role',
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
      {
      name: 'permissions',
      type: 'array',
      label: 'Manage Permissions',
      required: false,
      admin: {
        description: 'Define collection-level permissions for this administrator',
        components: {
          RowLabel: '/collections/Administrators/components/PermissionRowLabel',
        },
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'collection',
              type: 'select',
              required: true,
              label: 'Collection',
              options: [
                { label: 'Products', value: 'products' },
                { label: 'Orders', value: 'orders' },
                { label: 'Pages', value: 'pages' },
                { label: 'Categories', value: 'categories' },
                { label: 'Customers', value: 'customers' },
                { label: 'Media', value: 'media' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'actions',
              type: 'select',
              required: true,
              label: 'Allowed Actions',
              hasMany: true,
              options: [
                { label: 'Create', value: 'create' },
                { label: 'Read', value: 'read' },
                { label: 'Update', value: 'update' },
                { label: 'Delete', value: 'delete' },
              ],
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'permissionsDisplay',
          type: 'ui',
          admin: {
            components: {
              Field: '/collections/Administrators/components/PermissionsTable',
            },
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Account Information',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'loginAttempts',
          type: 'number',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Number of failed login attempts',
          },
        },
        {
          name: 'lockUntil',
          type: 'date',
          admin: {
            readOnly: true,
            description: 'Account locked until this date/time',
          },
        },
      ],
    },
    
   
    
  ],
  timestamps: true,
 
};
