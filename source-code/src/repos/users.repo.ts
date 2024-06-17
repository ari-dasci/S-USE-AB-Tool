import { makeRequest } from "@/lib/request";

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  organization: string;
}

export async function usersLookup(term: string) {
  const { data } = await makeRequest<UserInfo[]>("system.users.lookup", {
    string: term,
  });
  return data;
}
