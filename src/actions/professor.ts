"use server";

import { api } from "@/utils/api";
import { getSession } from "@/lib/auth";
import { ProfessorFormSchema } from "@/schema/professor";

export async function addProfessor(formData: FormData) {
  // Return early if not admin
  const userSession = await getSession();
  // TODO: Decrypt token here and check expiry & admin role
  if (!userSession) return { isValid: false };

  const form = { professorName: formData.get("professorName"), departmentName: formData.get("departmentName") };
  const validatedForm = ProfessorFormSchema.safeParse(form);
  if (!validatedForm.success) {
    return { errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.post("/api/v1/professor", data, userSession.token);
      const body = await res.json();
      console.log(body);
      if (body.code === 200) {
        return { isValid: true, data: body.data };
      }
    } catch (e) {
      console.log(e);
    }
  }
  return { isValid: false };
}
