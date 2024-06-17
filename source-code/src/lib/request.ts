import router from "@/router";

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export async function makeRequest<T>(
  method: string,
  body?: any,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const formData = new FormData();
  formData.set("method", method);

  for (const k in body) {
    const value = body[k];
    if (value instanceof Date) {
      formData.set(k, value.toISOString());
    } else {
      formData.set(k, body[k]);
    }
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

  if (!response.ok) {
    if (response.status == 401) {
      router.replace("/login");
    }
    throw new Error(
      `Request failed with status: ${response.status} - ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.status == "error") {
    throw new Error(data.message);
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
  };
}
