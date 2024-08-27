"use server";

import { api } from "@/utils/api";
import { getSession } from "@/lib/auth";
import { CourseFormSchema } from "@/schema/course";

export async function addCourse(formData: any) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  const validatedForm = CourseFormSchema.safeParse(formData);

  if (!validatedForm.success) {
    return { isValid: false, errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.post("/api/v1/course", data, userSession.token);
      const body = await res.json();
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

export async function updateCourse(courseId: string, formData: any) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  const validatedForm = CourseFormSchema.safeParse(formData);

  if (!validatedForm.success) {
    return { isValid: false, errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.put(`/api/v1/course/${courseId}`, data, userSession.token);
      const body = await res.json();
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

export async function deleteCourse(courseId: string) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false, status: "loggedOut" };

  try {
    const res = await api.delete(`/api/v1/course/${courseId}`, userSession.token);
    if (res.status === 200) {
      return { isValid: true };
    } else {
      const body = await res.json();
      console.log(body);
      return { isValid: false, error: body.error };
    }
  } catch (e) {
    console.log(e);
  }
  return { isValid: false, error: "알 수 없는 오류가 발생했습니다." };
}
