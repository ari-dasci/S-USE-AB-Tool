import { makeRequest } from "@/lib/request";
import { Test, TestFormData, TestQuestion } from "@/models/test.model";

export async function fetchTests(): Promise<Test[]> {
  const { data } = await makeRequest<Test[]>("config.tests.get");
  return data;
}
export async function createTest(data: TestFormData): Promise<void> {
  await makeRequest("config.tests.set", data);
}

export async function getQuestions(id: number): Promise<TestQuestion[]> {
  const { data } = await makeRequest<TestQuestion[]>("evaluations.tests.data", {
    id,
  });

  return data;
}

export async function getSelectedByProject(project: number): Promise<any> {
  const { data } = await makeRequest("project.tests.get", {
    project,
  });
  return data;
}

export async function setTest(project: number, test: number): Promise<any> {
  const { data } = await makeRequest("project.tests.set", {
    project,
    test,
  });
  return data;
}
export async function unsetTest(project: number, test: number): Promise<any> {
  const { data } = await makeRequest("project.tests.unset", {
    project,
    test,
  });
  return data;
}
