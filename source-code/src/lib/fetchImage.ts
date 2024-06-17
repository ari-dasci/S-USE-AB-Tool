export async function getImage(
  method: string,
  body?: any,
  options?: RequestInit
): Promise<string> {
  const formData = new FormData();
  formData.set("method", method);

  for (const k in body) {
    formData.set(k, body[k]);
  }

  const token = localStorage.getItem("token");

  const response = await fetch("https://lionware.dev/ari-dasci/webservice", {
    ...options,
    method: "POST",
    headers: (!!token || undefined) && {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.blob();

  return data.toString();
}
