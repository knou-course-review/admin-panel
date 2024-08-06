import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idQuery = searchParams.get("id");
  const pageQuery = searchParams.get("page");

  if (idQuery) {
    try {
      const res = await api.get(`/api/v1/course/${idQuery}`);
      if (res.status === 200) {
        const body = await res.json();
        return NextResponse.json(body.data);
      }
    } catch (e) {
      console.log(e);
    }
  } else if (pageQuery) {
    try {
      const res = await api.get(`/api/v2/courses?page=${pageQuery}`);
      if (res.status === 200) {
        const body = await res.json();
        return NextResponse.json(body.data);
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const res = await api.get("/api/v1/courses");
      if (res.status === 200) {
        const body = await res.json();
        return NextResponse.json(body.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return NextResponse.json({});
}
