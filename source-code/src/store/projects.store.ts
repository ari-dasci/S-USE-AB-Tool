import { getErrorMessage } from "@/lib/errors";
import { Alternative, AlternativeFormData } from "@/models/alternative.model";
import {
  Project,
  ProjectEvaluator,
  ProjectEvaluatorFormData,
  ProjectFormData,
} from "@/models/project.model";
import * as altRepo from "@/repos/alternatives.repo";
import * as repo from "@/repos/projects.repo";
import { defineStore } from "pinia";

export const useProjectsStore = defineStore({
  id: "projects",
  state: (): {
    projects: Project[];
    project:
      | (Project & {
          usersScale?: {
            experts: number;
            endUsers: number;
          };
          evaluators?: ProjectEvaluator[];
          alternatives?: Alternative[];
          tests?: number[];
          roles?: number[];
          roleScales?: Map<number, number>;
        })
      | undefined;
    isLoading: boolean;
    error: string | undefined;
    users?: any;
  } => ({
    error: undefined,
    projects: [],
    project: undefined,
    isLoading: false,
  }),
  actions: {
    async getProjects() {
      try {
        this.error = undefined;
        this.isLoading = true;
        this.error = undefined;
        const projects = await repo.fetchProjects();
        this.projects = projects;
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async enroll(data: ProjectEvaluatorFormData) {
      try {
        this.error = undefined;
        this.isLoading = true;
        this.error = undefined;
        await repo.enroll(this.project!.id, data);
        await this.getEvaluators();
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async unenroll(user: number) {
      try {
        this.error = undefined;
        this.isLoading = true;
        this.error = undefined;
        await repo.unEnroll(this.project!.id, user);
        await this.getEvaluators();
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async createProject(project: ProjectFormData) {
      try {
        this.error = undefined;
        this.isLoading = true;
        this.error = undefined;
        await repo.createProject(project);
        await this.getProjects();
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getProject(id: number) {
      try {
        this.error = undefined;
        this.isLoading = true;
        this.project = undefined;
        this.projects = await repo.fetchProjects();
        this.project = this.projects.find((e) => e.id == id);
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async updateProject(data: ProjectFormData) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await repo.updateProject(this.project!.id, data);
        await this.getProject(this.project!.id);
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },

    async setUserScale(user: "EXPERT" | "ENDUSER", value: number) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await repo.setUserScale(this.project!.id, {
          user,
          value,
        });
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getUsersScale() {
      try {
        this.error = undefined;
        this.isLoading = true;
        const usersScale = await repo.getUsersScale(this.project!.id);
        this.project = { ...this.project!, usersScale };
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getEvaluators() {
      try {
        this.error = undefined;
        this.isLoading = true;
        const evaluators = await repo.getEvaluators(this.project!.id);
        this.project = { ...this.project!, evaluators };
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getAlternatives() {
      try {
        this.error = undefined;
        this.isLoading = true;
        const alternatives = await altRepo.getAlternatives(this.project!.id);
        this.project = { ...this.project!, alternatives };
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async addAlternative(data: AlternativeFormData) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await altRepo.addAlternative(this.project!.id, data);
        await this.getAlternatives();
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async updateAlternative(id: number, data: AlternativeFormData) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await altRepo.updateAlternative(id, data);
        await this.getAlternatives();
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteAlternative(id: number) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await altRepo.deleteAlternative(id);
        await this.getAlternatives();
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },

    async getRoles() {
      try {
        this.error = undefined;
        this.isLoading = true;
        this.project = {
          ...this.project!,
          roles: undefined,
          roleScales: undefined,
        };
        const roles = await repo.getRoles(this.project!.id);
        const roleScales = await repo.getRoleScale(this.project!.id);
        this.project = {
          ...this.project!,
          roles,
          roleScales,
        };
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async setRole(role: number, value: boolean) {
      try {
        this.error = undefined;
        this.isLoading = true;
        if (value) {
          await repo.setRole(this.project!.id, role);
          this.project = {
            ...this.project!,
            roles: [...this.project!.roles!, role],
          };
        } else {
          await repo.unsetRole(this.project!.id, role);
          this.project = {
            ...this.project!,
            roles: this.project!.roles!.filter((e) => e != role),
          };
        }
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async setRoleScale(roleCategory: number, value: number) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await repo.setRoleScale(this.project!.id, roleCategory, value);
      } catch (err) {
        this.error = getErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    // allProjects(state): Project[] {
    //   return [].concat(...Array(5).fill(state.projects));
    // },
  },
});
