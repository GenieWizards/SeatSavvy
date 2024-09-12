// NOTE: If updating values update in both
export const AuthRoles = ["user", "admin"] as const;

export enum AuthRole {
  USER = "user",
  ADMIN = "admin",
}
