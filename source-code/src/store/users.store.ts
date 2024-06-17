import * as repo from "@/repos/users.repo";
import { UserInfo } from "@/repos/users.repo";
import { defineStore } from "pinia";

export const useUsersStore = defineStore({
  id: "users",
  state: (): {
    users: UserInfo[];
    isLoading: boolean;
  } => ({
    users: [],
    isLoading: false,
  }),
  actions: {
    async clear() {
      try {
        this.isLoading = true;
        this.users = [];
      } finally {
        this.isLoading = false;
      }
    },
    async searchByTerm(term: string) {
      try {
        this.isLoading = true;
        const users = await repo.usersLookup(term);
        this.users = users;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
