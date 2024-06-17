import { getErrorMessage } from "@/lib/errors";
import { UnregisteredUser, User } from "@/models/user.model";
import * as repo from "@/repos/auth.repo";
import { RemovableRef, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { IStoreState } from ".";

type AuthStoreState = IStoreState & { user: RemovableRef<User | undefined> };

export const useAuthStore = defineStore({
  id: "auth",
  state: function (): AuthStoreState {
    const user = useLocalStorage<User | undefined>("user", null, {
      serializer: {
        read: function (v: string): User | undefined {
          return v && JSON.parse(v);
        },
        write: function (v: User | undefined): string {
          return JSON.stringify(v);
        },
      },
    });
    return {
      isLoading: false,
      error: undefined,
      user,
    };
  },
  actions: {
    async login(email: string, pswd: string) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await repo.login(email, pswd);
        const user = await repo.getUser();
        this.user = user;
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      try {
        this.isLoading = true;
        this.error = undefined;
        this.user = undefined;
        await repo.logout();
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async register(user: UnregisteredUser) {
      try {
        this.isLoading = true;
        this.error = undefined;
        await repo.register(user);
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    isAuthenticated(state): boolean {
      return state.user != null;
    },
  },
});
