import { useAuthStore } from "@/store/auth.store";
import { createRouter, createWebHashHistory, Router } from "vue-router";

const users = {
  template: "<div>Users</div>",
};
const roles = {
  template: "<div>Roles</div>",
};
const reports = {
  template: "<div>Reports</div>",
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "projects",
        name: "projects",
        redirect: { name: "projectsList" },
        component: () => import("@/views/Projects.vue"),
        alias: ["/"],
        children: [
          {
            path: "",
            name: "projectsList",
            component: () => import("@/components/ProjectsList.vue"),
          },
          {
            path: "evaluator",
            name: "evaluatorProjectsList",
            component: () => import("@/components/EvaluatorProjects.vue"),
          },
        ],
      },
      {
        path: "tests",
        name: "tests",
        component: () => import("@/views/Tests.vue"),
      },
      { path: "users", name: "users", component: users },
      { path: "roles", name: "roles", component: roles },
      { path: "reports", name: "reports", component: reports },
    ],
  },
  {
    path: "/project/:id",
    name: "project",
    component: () => import("@/views/ProjectDetail.vue"),
    children: [
      {
        path: "",
        name: "project.evaluations",
        alias: ["evaluations"],
        component: () => import("@/views/ProjectEvaluations.vue"),
      },
      {
        path: "settings",
        name: "project.settings",
        redirect: { name: "project.settings.general" },
        component: () => import("@/views/ProjectSettings.vue"),
        children: [
          {
            path: "",
            name: "project.settings.general",
            component: () => import("@/components/ProjectGeneralSettings.vue"),
            meta: { title: "General" },
          },
          {
            path: "alternatives",
            name: "project.settings.alternatives",
            component: () => import("@/components/ProjectAlternatives.vue"),
            meta: { title: "Alternatives" },
          },
          {
            path: "criterian",
            name: "project.settings.criterian",
            component: () => import("@/components/ProjectCriterianForm.vue"),
            meta: { title: "Criterian" },
          },
          {
            path: "users",
            name: "project.settings.users",
            component: () => import("@/components/ProjectUsersForm.vue"),
            meta: { title: "Users" },
          },
          {
            path: "roles",
            name: "project.settings.roles",
            component: () => import("@/components/ProjectRoles.vue"),
            meta: { title: "Roles" },
          },
        ],
      },
    ],
  },
  {
    path: "/evaluate/:project",
    name: "EvaluateProject",
    component: () => import("@/views/EvaluateProject.vue"),
  },
  {
    path: "/evaluate/:project/alternative/:alternative/test/:test",
    name: "doTest",
    component: () => import("@/views/Test.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated && to.name !== "Login" && to.name !== "Register") {
    return { name: "Login" };
  }
});

export default router;
