"use server";

import { api } from "@/utils/api";
import { getSession } from "@/lib/auth";
import { CourseFormSchema } from "@/schema/course";

export async function addCourse(formData: any) {
  // Return early if not admin
  const userSession = await getSession();
  // TODO: Decrypt token here and check expiry & admin role
  if (!userSession) return { isValid: false };

  const validatedForm = CourseFormSchema.safeParse(formData);
  console.log(validatedForm);
  if (!validatedForm.success) {
    return { errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.post("/api/v1/course", data, userSession.token);
      const body = await res.json();
      console.log(body);
      if (body.code === 200) {
        return { isValid: true, data: body.data };
      }
      return { isValid: false, errors: { unknown: [`* ${body.message}`] } };
    } catch (e) {
      console.log(e);
    }
  }
  return { isValid: false };
}
