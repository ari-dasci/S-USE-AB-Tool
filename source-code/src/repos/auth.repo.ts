import { makeRequest } from "@/lib/request";
import { formatPic } from "@/lib/utils";
import { UnregisteredUser, User } from "@/models/user.model";

const tokenKey = "token";
const usersKey = "user";

export async function register(user: UnregisteredUser): Promise<void> {
  if (user.password != user.passwordConfirmation) {
    throw Error("Passwords are not equal");
  }
  const profilePhoto = await fetch(user.profilePhoto).then((e) => e.blob());
  await makeRequest("system.profile.create", {
    ...user,
    profilePhoto,
  });
}

export async function login(email: string, pswd: string): Promise<void> {
  const { data } = await makeRequest<{ ari_dasci_uid: string }>(
    "system.login",
    {
      username: email,
      password: pswd,
    }
  );

  localStorage.setItem(tokenKey, data.ari_dasci_uid);
}

export async function logout(): Promise<void> {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(usersKey);
}

export async function getUser(): Promise<User | undefined> {
  const { data } = await makeRequest<User>("system.profile.read");
  const token = localStorage.getItem("token")!;
  const profileImage = formatPic(
    "system.profile.pic",
    undefined,
    token
  ).toString();
  return { profileImage, ...data };
}
