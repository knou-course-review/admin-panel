"use server";

import { api } from "@/utils/api";
import { getSession } from "@/lib/auth";
import { DepartmentFormSchema } from "@/schema/department";

export async function addDepartment(formData: FormData) {
  // Return early if not admin
  const userSession = await getSession();
  // TODO: Decrypt token here and check expiry & admin role
  if (!userSession) return { isValid: false };

  const form = { departmentName: formData.get("departmentName") };
  const validatedForm = DepartmentFormSchema.safeParse(form);
  if (!validatedForm.success) {
    return { errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.post("/api/v1/department", data, userSession.token);
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

export async function updateDepartment(departmentId: number, formData: any) {
  // Return early if not admin
  const userSession = await getSession();
  // TODO: Decrypt token here and check expiry & admin role
  if (!userSession) return { isValid: false };

  const validatedForm = DepartmentFormSchema.safeParse(formData);
  if (!validatedForm.success) {
    return { errors: validatedForm.error.flatten().fieldErrors };
  }

  if (validatedForm.success) {
    const data = validatedForm.data;
    try {
      const res = await api.put(`/api/v1/department/${departmentId}`, data, userSession.token);
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

export async function deleteDepartment(departmentId: string) {
  // Return early if not admin
  const userSession = await getSession();
  // TODO: Decrypt token here and check expiry & admin role
  if (!userSession) return { isValid: false };

  try {
    const res = await api.delete(`/api/v1/department/${departmentId}`, userSession.token);
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
