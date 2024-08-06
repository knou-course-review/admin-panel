import { NextResponse } from "next/server";
import { getDepartments } from "@/actions/department";

export async function GET() {
  const result = await getDepartments();
  return NextResponse.json(result);
}
