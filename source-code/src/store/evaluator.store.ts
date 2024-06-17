import { getErrorMessage } from "@/lib/errors";
import { Alternative } from "@/models/alternative.model";
import { Project } from "@/models/project.model";
import { Role } from "@/models/role.model";
import { Test, TestQuestion } from "@/models/test.model";
import * as repo from "@/repos/evaluator.repo";
import { defineStore } from "pinia";
import { IStoreState } from ".";

export const useEvaluatorStore = defineStore({
  id: "evaluator",
  state: function (): IStoreState & {
    projects: Project[];
    project?: Project;
    alternatives: Alternative[];
    tests: Test[];
    roles: Role[];
    test?: Test;
    questions: TestQuestion[];
  } {
    return {
      isLoading: false,
      error: undefined,
      projects: [],
      project: undefined,
      alternatives: [],
      tests: [],
      roles: [],
      test: undefined,
      questions: [],
    };
  },
  actions: {
    async getProjects() {
      try {
        this.error = undefined;
        this.isLoading = true;
        this.projects = await repo.getProjects();
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getProject(id: number) {
      try {
        this.error = undefined;
        this.isLoading = true;
        this.projects = await repo.getProjects();
        this.project = this.projects.find((e) => e.id == id);
        await Promise.all([
          this.getAlternatives(),
          this.getTests(),
          this.getRoles(),
        ]);
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getAlternatives() {
      try {
        this.alternatives = [];
        this.error = undefined;
        this.isLoading = true;
        this.alternatives = await repo.getAlternatives(this.project!.id);
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getTests() {
      try {
        this.tests = [];
        this.error = undefined;
        this.isLoading = true;
        this.tests = await repo.getTests(this.project!.id);
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getTest(project: number, test: number) {
      try {
        this.test = undefined;
        this.error = undefined;
        this.isLoading = true;
        this.tests = await repo.getTests(project);
        this.test = this.tests.find((e) => e.id == test);

        this.questions = await repo.getQuestions(test, this.test!.type);
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getRoles() {
      try {
        this.roles = [];
        this.error = undefined;
        this.isLoading = true;
        this.roles = await repo.getRoles(this.project!.id);
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async setRole(project: number, role: number) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await repo.setRole(project, role);
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async unsetRole(project: number, role: number) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await repo.unsetRole(project, role);
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    async saveAnswer(
      project: number,
      alternative: number,
      test: number,
      index: number,
      answer: { value: any; time?: number; success?: boolean }
    ) {
      try {
        this.error = undefined;
        this.isLoading = true;
        await repo.evaluate({
          project,
          alternative,
          test,
          index,
          ...answer,
          value: Number(answer.value),
        });
      } catch (err) {
        this.error = getErrorMessage(err);
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    categories: (state) => {
      return [...new Set(state.questions.map((e) => e.category))].map(
        (e, i) => ({ id: i, title: e })
      );
    },
  },
});
