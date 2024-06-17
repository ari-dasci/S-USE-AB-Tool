import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const baseUrl = new URL("https://lionware.dev/ari-dasci/webservice");

export function formatPic(method: string, id?: number, token?: string): string {
  const img = new URL(baseUrl);
  img.searchParams.set("method", method);
  if (id) {
    img.searchParams.set("id", id.toString());
  }
  if (token) {
    img.searchParams.set("token", token);
  }
  return img.toString();
}
