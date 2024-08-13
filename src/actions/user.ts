"use server";

import { getSession } from "@/lib/auth";

export async function changeUserStatus(userId: number) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return { isValid: false };

  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/admin/user/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userSession.token,
      },
    });
    const body = await res.json();
    if (body.code === 200) {
      return { isValid: true };
    }
  } catch (e) {
    console.log(e);
  }
  return { isValid: false };
}
