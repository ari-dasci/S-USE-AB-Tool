import { makeRequest } from "@/lib/request";
import { Role, RoleCategory } from "@/models/role.model";

export async function fetchRoles(): Promise<Role[]> {
  const { data } = await makeRequest<Role[]>("config.roles.get");
  return data;
}

export async function fetchCategories(): Promise<RoleCategory[]> {
  const { data } = await makeRequest<RoleCategory[]>(
    "config.roles.categories.get"
  );
  return data;
}
