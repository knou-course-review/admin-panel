"use server";

import { saveSession, verifyAuth } from "@/lib/auth";
import { api } from "@/utils/api";
import { ErrorSchema } from "@/schema/error";
import { LoginFormSchema } from "@/schema/login";

export async function login(credentials: { username: string; password: string }) {
  const validatedForm = LoginFormSchema.safeParse(credentials);
  if (validatedForm.success) {
    try {
      const res = await api.post("/api/v1/users/sign-in", credentials);
      if (res.ok) {
        const bearerHeader = res.headers.get("Authorization");
        if (!bearerHeader) return { isValid: false, invalidCredentials: true };
        const accessToken = bearerHeader.split("Bearer ")[1];
        const payload = await verifyAuth(accessToken);
        if (payload.role === "ADMIN") {
          await saveSession(accessToken, payload.exp * 1000);
          return { isValid: true };
        }
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
