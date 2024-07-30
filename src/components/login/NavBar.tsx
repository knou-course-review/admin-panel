"use client";

import Link from "next/link";
import { Logout } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function NavBar() {
  const logout = () => {};
  return (
    <div className="flex flex-col w-52 max-h-dvh p-6 list-none bg-slate-950 text-white">
      <div className="mb-8 font-bold">user_</div>
      <li className="mb-4">
        <Link href="/courses">강의 목록</Link>
      </li>
      <li>
        <Link href="/members">회원 목록</Link>
      </li>
      <li className="mt-auto self-end">
        <IconButton onClick={logout}>
          <Logout sx={{ color: "white" }} />
        </IconButton>
      </li>
    </div>
  );
}
