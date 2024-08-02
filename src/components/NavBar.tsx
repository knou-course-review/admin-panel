"use client";

import Link from "next/link";
import {
  AccountCircle,
  Domain,
  DomainAdd,
  Group,
  GroupAdd,
  Groups,
  LibraryBooksOutlined,
  Logout,
  PostAdd,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function NavBar() {
  const logout = () => {};
  return (
    <div className="flex flex-col w-52 max-h-dvh p-6 list-none bg-neutral-950 text-white">
      <div className="mb-8 font-bold">
        <AccountCircle fontSize="small" /> admin_12345
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <div>
          <span className="font-semibold text-sm text-slate-300">조회</span>
        </div>
        <li>
          <Link href="/departments">
            <Domain fontSize="small" /> 학과 목록
          </Link>
        </li>
        <li>
          <Link href="/professors">
            <Group fontSize="small" /> 교수 목록
          </Link>
        </li>
        <li>
          <Link href="/courses">
            <LibraryBooksOutlined fontSize="small" /> 강의 목록
          </Link>
        </li>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <div>
          <span className="font-semibold text-sm text-slate-300">신규 등록</span>
        </div>
        <li>
          <Link href="/departments/new">
            <DomainAdd fontSize="small" /> 학과 등록
          </Link>
        </li>
        <li>
          <Link href="/professors/new">
            <GroupAdd fontSize="small" /> 교수 등록
          </Link>
        </li>
        <li>
          <Link href="/courses/new">
            <PostAdd fontSize="small" /> 강의 등록
          </Link>
        </li>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <div>
          <span className="font-semibold text-sm text-slate-300">관리</span>
        </div>
        <li>
          <Link href="/members">
            <Groups fontSize="small" /> 회원 관리
          </Link>
        </li>
      </div>
      <li className="mt-auto self-end">
        <IconButton onClick={logout}>
          <Logout sx={{ color: "white" }} />
        </IconButton>
      </li>
    </div>
  );
}
