import { makeRequest } from "@/lib/request";
import { formatPic } from "@/lib/utils";
import { Alternative } from "@/models/alternative.model";
import { Project } from "@/models/project.model";
import { Role } from "@/models/role.model";
import { EvaluationTypes, TestQuestion } from "@/models/test.model";

export async function getProjects(): Promise<any> {
  const { data } = await makeRequest<Project[]>("evaluations.projects.list");
  return data.map((e) => {
    e.pic = formatPic("project.pic", e.id);
    return e;
  });
}

export async function getAlternatives(project: number): Promise<Alternative[]> {
  const { data } = await makeRequest<Alternative[]>(
    "evaluations.alternatives.get",
    {
      project,
    }
  );
  return data.map((e) => {
    e.logo = formatPic("project.alternatives.pic", e.id);
    return e;
  });
}

export async function getTests(project: number): Promise<any> {
  const { data } = await makeRequest("evaluations.tests.list", { project });
  return data;
}

export async function getQuestions(
  id: number,
  type: EvaluationTypes
): Promise<TestQuestion[]> {
  if (type === "NPS") {
    return Promise.resolve([
      {
        index: 0,
        title: "NPS",
        answers: Array.from({ length: 10 }, (_, i) => ({
          id: i,
          value: i + 1,
          title: (i + 1).toString(),
        })),
      },
    ]);
  }
  if (type === "ACC") {
    return Promise.resolve([
      {
        index: 0,
        title: "ACC",
        answers: Array.from({ length: 3 }, (_, i) => ({
          id: i,
          value: i + 1,
          title: "A".repeat(i + 1),
        })),
      },
    ]);
  }

  const { data } = await makeRequest<any[]>("evaluations.tests.data", {
    id,
  });

  let answers = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    value: i + 1,
    title: (i + 1).toString(),
  }));

  if (type === "SUS" || type === "USABILITY") {
    const titles = [
      "UNSATISFYING",
      "A LITTLE SATISFYING",
      "INDIFFERENT",
      "SATISFYING",
      "VERY SATISFYING",
    ];
    answers = titles.map((title, index) => ({
      id: index,
      value: index + 1,
      title,
    }));
  }

  if (type === "QUEST") {
    const titles = ["ANGER", "FRUSTATION", "INDIFFERENCE", "JOY", "HAPPINESS"];
    answers = titles.map((title, index) => ({
      id: index,
      value: index + 1,
      title,
    }));
  }

  return data.map((e) => ({
    index: e.index as number,
    title: (e.question || e.task) as string,
    category: (e.category || e.dimension) as string,
    answers,
  }));
}

export async function getRoles(project: number): Promise<Role[]> {
  const { data } = await makeRequest<Role[]>("evaluations.roles.selectable", {
    project,
  });
  return data;
}

export async function setRole(project: number, role: number): Promise<any> {
  const { data } = await makeRequest("evaluations.roles.set", {
    project,
    role,
  });
  return data;
}

export async function unsetRole(project: number, role: number): Promise<any> {
  const { data } = await makeRequest("evaluations.roles.set", {
    project,
    role,
  });
  return data;
}

export async function evaluate(body: {
  project: number;
  alternative: number;
  test: number;
  index: number;
  value: number;
  time?: number;
  success?: boolean;
}): Promise<any> {
  const { data } = await makeRequest("evaluations.tests.eval", body);
  return data;
}
