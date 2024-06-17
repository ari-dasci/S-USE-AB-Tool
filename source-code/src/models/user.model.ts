import * as z from "zod";

export const unregisteredUserSchema = z.object({
  profilePhoto: z.custom((data) => data != undefined),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string().min(5).max(20),
  passwordConfirmation: z.string().min(5).max(20),
  organization: z.string(),
});
// .refine(({ password, passwordConfirmation }) => {
//   return password === passwordConfirmation;
// });

export type UnregisteredUser = z.infer<typeof unregisteredUserSchema>;

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  organization: string;
  profileImage?: string;
}
