// src/access/isAdmin.ts
import type { Access } from "payload";

export const isAdmin: Access = ({ req: { user } }) =>
  user?.collection === "administrators" && (
    (typeof user.role?.value === "object" && user.role.value.name === "admin") ||
    (typeof user.role?.value === "string" && user.role?.value === "admin")
  );

// src/access/isManager.ts

export const isManager: Access = ({ req: { user } }) =>
  user?.collection === "administrators" && (
    (typeof user.role?.value === "object" && user.role.value.name === "manager") ||
    (typeof user.role?.value === "string" && user.role?.value === "manager")
  );

