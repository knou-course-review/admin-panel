import "server-only";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

type UserJwtPayload = {
  id: number;
  role: string;
  iat: number;
  exp: number;
};

// Functions for JWT verification
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("Missing JWT secret key.");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyAuth(token: string) {
  const key = getJwtSecretKey();
  const { payload } = await jwtVerify(token, key);
  return payload as UserJwtPayload;
}

// Session functions
export async function saveSession(value: string, expires: number) {
  cookies().set("knouka", value, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookie = cookies().get("knouka")?.value;
  if (!cookie) return { isLoggedIn: false };

  let payload: UserJwtPayload;
  const currentTime = Date.now();
  try {
    payload = await verifyAuth(cookie);
  } catch (e) {
    console.log(e);
    return { isLoggedIn: false };
  }
  const expTime = payload.exp * 1000;
  if (expTime < currentTime || payload.role !== "ADMIN") return { isLoggedIn: false };
  return { isLoggedIn: true, payload, token: cookie };
}

export async function deleteSession() {
  const cookie = cookies().get("knouka")?.value;
  if (!cookie) return;
  cookies().set("knouka", "", { expires: new Date(0) });
}
