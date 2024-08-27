"use server";

import { api } from "@/utils/api";
import { getSession } from "@/lib/auth";
import { ProfessorFormSchema } from "@/schema/professor";

export async function addProfessor(formData: any) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  const validatedForm = ProfessorFormSchema.safeParse(formData);

  if (!validatedForm.success) {
    return { isValid: false, errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.post("/api/v1/professor", data, userSession.token);
      const body = await res.json();
      if (body.code === 200) {
        return { isValid: true, data: body.data };
      }
      return { isValid: false, errors: { unknown: [`* ${body.message}`] } };
    } catch (e) {
      console.log(e);
    }
  }
  return { isValid: false, errors: { unknown: ["* 오류가 발생했습니다. 나중에 다시 시도해 주세요."] } };
}

export async function updateProfessor(professorId: string, formData: any) {
  const userSession = await getSession();
  if (!userSession) return { isValid: false };

  const validatedForm = ProfessorFormSchema.safeParse(formData);

  if (!validatedForm.success) {
    return { errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.put(`/api/v1/professor/${professorId}`, data, userSession.token);
      const body = await res.json();
      if (body.code === 200) {
        return { isValid: true, data: body.data };
      }
    } catch (e) {
      console.log(e);
    }
  }
  return { isValid: false, errors: { unknown: ["* 오류가 발생했습니다. 나중에 다시 시도해 주세요."] } };
}

export async function deleteProfessor(professorId: string) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await api.delete(`/api/v1/professor/${professorId}`, userSession.token);
    if (res.status === 200) {
      return { isValid: true };
    } else {
      const body = await res.json();
      return { isValid: false, error: body.error };
    }
  } catch (e) {
    console.log(e);
  }
  return { isValid: false, error: "알 수 없는 오류가 발생했습니다." };
}
