import { Role, RoleCategory } from "@/models/role.model";
import * as repo from "@/repos/role.repo";
import { defineStore } from "pinia";

export const useRolesStore = defineStore({
  id: "roles",
  state: (): {
    categories: (RoleCategory & { roles: Role[] })[];
    isLoading: boolean;
  } => ({
    categories: [],
    isLoading: false,
  }),
  actions: {
    async getRoles() {
      try {
        this.isLoading = true;
        const roles = (await repo.fetchRoles()).reduce<{
          [key: number]: Role[];
        }>((rv, x) => {
          (rv[x.role_category] = rv[x.role_category] || []).push(x);
          return rv;
        }, {});
        const categories = await repo.fetchCategories();
        this.categories = categories.map((e) => ({
          ...e,
          roles: roles[e.id],
        }));
      } finally {
        this.isLoading = false;
      }
    },
  },
});
