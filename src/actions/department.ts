"use server";

import { api } from "@/utils/api";
import { getSession } from "@/lib/auth";
import { DepartmentFormSchema } from "@/schema/department";

export async function addDepartment(formData: FormData) {
  const userSession = await getSession();
  if (!userSession) return { isValid: false };

  const form = { departmentName: formData.get("departmentName") };
  const validatedForm = DepartmentFormSchema.safeParse(form);
  if (!validatedForm.success) {
    return { isValid: false, errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.post("/api/v1/department", data, userSession.token);
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

export async function updateDepartment(departmentId: string, formData: any) {
  const userSession = await getSession();
  if (!userSession) return { isValid: false };

  const validatedForm = DepartmentFormSchema.safeParse(formData);
  if (!validatedForm.success) {
    return { isValid: false, errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.put(`/api/v1/department/${departmentId}`, data, userSession.token);
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

export async function deleteDepartment(departmentId: string) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await api.delete(`/api/v1/department/${departmentId}`, userSession.token);
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
