import { makeRequest } from "@/lib/request";
import { formatPic } from "@/lib/utils";
import {
  Project,
  ProjectEvaluator,
  ProjectEvaluatorFormData,
  ProjectFormData,
  UsersScale,
} from "@/models/project.model";

const projectsKey = "projects";

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await makeRequest<Project[]>("project.get");
  localStorage.setItem(projectsKey, JSON.stringify(data));
  return data.map((e) => {
    e.pic = formatPic("project.pic", e.id);
    return e;
  });
}

export async function getUsersScale(project: number): Promise<UsersScale> {
  const { data } = await makeRequest<{ experts: number; endusers: number }>(
    "project.userScale.get",
    {
      project,
    }
  );

  return { ...data, endUsers: data.endusers };
}

export async function setUserScale(
  project: number,
  body: { user: "EXPERT" | "ENDUSER"; value: Number }
): Promise<any> {
  const { data } = await makeRequest("project.userScale.set", {
    project,
    ...body,
  });
  return data;
}

export async function getEvaluators(
  project: number
): Promise<ProjectEvaluator[]> {
  const { data } = await makeRequest<ProjectEvaluator[]>("project.evaluators", {
    project,
  });

  return data;
}

export async function enroll(
  project: number,
  body: ProjectEvaluatorFormData
): Promise<void> {
  await makeRequest("project.enroll", {
    project,
    ...body,
  });
}

export async function unEnroll(project: number, user: number): Promise<void> {
  await makeRequest("project.unenroll", {
    project,
    user,
  });
}

export async function createProject(body: ProjectFormData): Promise<Project> {
  const picReq = await fetch(new URL(body.pic!));
  const pic = await picReq.blob();
  const { data } = await makeRequest<any>("project.add", { ...body, pic: pic });
  return data;
}

export async function updateProject(
  project: number,
  body: ProjectFormData
): Promise<Project> {
  const url = new URL(body.pic!);
  const pic = url.protocol.startsWith("http")
    ? null
    : await fetch(url).then((e) => e.blob());
  const { data } = await makeRequest<any>("project.edit", {
    ...body,
    id: project,
    pic: pic,
  });
  return data;
}

export async function deleteProject(id: number): Promise<void> {
  await makeRequest<void>("project.delete", {
    id,
  });
}

export async function getRoles(project: number): Promise<number[]> {
  const { data } = await makeRequest<any>("project.roles.get", { project });
  return data;
}

export async function setRole(project: number, role: number): Promise<any> {
  const { data } = await makeRequest<any>("project.roles.set", {
    project,
    role,
  });
  return data;
}

export async function unsetRole(project: number, role: number): Promise<any> {
  const { data } = await makeRequest<any>("project.roles.unset", {
    project,
    role,
  });
  return data;
}

export async function getRoleScale(project: number): Promise<any> {
  const { data } = await makeRequest<any[]>("project.roleScale.get", {
    project,
  });
  return new Map<number, number>(
    Object.entries(data).map(([key, value]) => [Number(key), value])
  );
}

export async function setRoleScale(
  project: number,
  rolecategory: number,
  value: number
): Promise<void> {
  const { data } = await makeRequest<any>("project.roleScale.set", {
    project,
    rolecategory,
    value,
  });
  return data;
}
