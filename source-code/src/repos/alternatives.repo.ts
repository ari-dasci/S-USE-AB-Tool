import { makeRequest } from "@/lib/request";
import { formatPic } from "@/lib/utils";
import { Alternative, AlternativeFormData } from "@/models/alternative.model";

export async function getAlternatives(project: number): Promise<Alternative[]> {
  const { data } = await makeRequest<Alternative[]>(
    "project.alternatives.get",
    {
      project,
    }
  );
  return data.map((e) => {
    e.logo = formatPic("project.alternatives.pic", e.id);
    return e;
  });
}

export async function addAlternative(
  project: number,
  formData: AlternativeFormData
): Promise<any> {
  const url = new URL(formData.logo!);
  const logo = url.protocol.startsWith("http")
    ? null
    : await fetch(url).then((e) => e.blob());
  const { data } = await makeRequest("project.alternatives.add", {
    project,
    ...formData,
    logo,
  });
  return data;
}

export async function updateAlternative(
  id: number,
  formData: AlternativeFormData
): Promise<any> {
  const logo = await fetch(formData.logo!).then((e) => e.blob());
  const { data } = await makeRequest("project.alternatives.update", {
    id,
    ...formData,
    logo,
  });
  return data;
}

export async function deleteAlternative(id: number): Promise<void> {
  await makeRequest("project.alternatives.delete", {
    id,
  });
}
