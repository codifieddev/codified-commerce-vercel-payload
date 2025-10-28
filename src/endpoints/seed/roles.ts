import payload from 'payload';

export async function seedRoles() {
  const roles = [
    {
      name: 'admin',
      permissions: [
        { collection: 'pages', actions: ['create', 'read', 'update', 'delete', 'admin'] as ('create'|'read'|'update'|'delete'|'admin')[] },
        { collection: 'media', actions: ['create', 'read', 'update', 'delete', 'admin'] as ('create'|'read'|'update'|'delete'|'admin')[] },
        { collection: 'administrators', actions: ['create', 'read', 'update', 'delete', 'admin'] as ('create'|'read'|'update'|'delete'|'admin')[] },
      ],
    },
    {
      name: 'manager',
      permissions: [
        { collection: 'pages', actions: ['read', 'update'] as ('create'|'read'|'update'|'delete'|'admin')[] },
        { collection: 'media', actions: ['read'] as ('create'|'read'|'update'|'delete'|'admin')[] },
      ],
    },
    {
      name: 'editor',
      permissions: [
        { collection: 'pages', actions: ['read'] as ('create'|'read'|'update'|'delete'|'admin')[] },
      ],
    },
  ];

  for (const role of roles) {
    await payload.create({ collection: 'roles', data: role });
  }
  console.log('Roles seeded');
}

if (import.meta.url === `file://${process.argv[1]}` || import.meta.url === process.argv[1]) {
  seedRoles().then(() => process.exit(0));
}
