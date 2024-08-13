import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/api";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return NextResponse.json({});

  const { searchParams } = new URL(req.url);
  const pageQuery = searchParams.get("page");

  try {
    const res = await api.get(`/api/v1/admin/users?page=${pageQuery}`, userSession.token);
    if (res.status === 200) {
      const body = await res.json();
      return NextResponse.json(body.data);
    }
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({ data: null });
}
