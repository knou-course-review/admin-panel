"use server";

import { saveSession } from "@/lib/auth";
import { ErrorSchema } from "@/schema/error";
import { LoginFormSchema } from "@/schema/login";
import { api } from "@/utils/api";

export async function login(credentials: { username: string; password: string }) {
  const validatedForm = LoginFormSchema.safeParse(credentials);
  if (validatedForm.success) {
    try {
      const res = await api.post("/api/v1/users/sign-in", credentials);
      console.log(res);
      if (res.ok) {
        const bearerToken = res.headers.get("Authorization");
        if (!bearerToken) return;
        const accessToken = bearerToken.split("Bearer ");
        saveSession(accessToken[1]);
        return { isValid: true };
      }
      return { isValid: false, invalidCredentials: true };
    } catch (e) {
      const isError = ErrorSchema.safeParse(e);
      if (isError.success) {
        console.log((e as Error).message);
      } else console.log(e);
      return { isValid: false, unknownError: true };
    }
  }
  return { isValid: false, errors: validatedForm.error?.flatten().fieldErrors };
}
