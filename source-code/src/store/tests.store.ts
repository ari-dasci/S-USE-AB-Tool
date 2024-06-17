import {
  Test,
  TestDetail,
  TestFormData,
  TestQuestion,
} from "@/models/test.model";
import * as repo from "@/repos/tests.repo";
import { defineStore } from "pinia";

export const useTestStore = defineStore({
  id: "tests",
  state: (): {
    tests: Test[];
    selected: number[];
    test?: TestDetail;
    questions: TestQuestion[];
    isLoading: boolean;
  } => ({
    tests: [],
    selected: [],
    questions: [],
    test: undefined,
    isLoading: false,
  }),
  actions: {
    async getTests() {
      try {
        this.isLoading = true;
        const res = await repo.fetchTests();
        this.tests = res;
      } finally {
        this.isLoading = false;
      }
    },
    async getQuestions(id: number) {
      try {
        this.isLoading = true;
        this.questions = [];
        const questions = await repo.getQuestions(id);
        this.questions = questions;
      } finally {
        this.isLoading = false;
      }
    },
    async createTest(data: TestFormData) {
      try {
        this.isLoading = true;
        await repo.createTest(data);
        await this.getTests();
      } finally {
        this.isLoading = false;
      }
    },

    async getSelectedByProject(project: number) {
      try {
        this.isLoading = true;
        const selected = await repo.getSelectedByProject(project);
        this.selected = selected;
      } finally {
        this.isLoading = false;
      }
    },
    async setTest(project: number, test: number) {
      try {
        this.isLoading = true;
        await repo.setTest(project, test);
        this.selected = [...this.selected, test];
      } finally {
        this.isLoading = false;
      }
    },
    async unsetTest(project: number, test: number) {
      try {
        this.isLoading = true;
        await repo.unsetTest(project, test);
        this.selected = this.selected.filter((e) => e != test);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    selectedTests({ tests, selected }) {
      return tests.filter((e) => selected.includes(e.id));
    },
  },
});
