import Link from "next/link";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Domain from "@mui/icons-material/Domain";
import DomainAdd from "@mui/icons-material/DomainAdd";
import Flag from "@mui/icons-material/Flag";
import Group from "@mui/icons-material/Group";
import GroupAdd from "@mui/icons-material/GroupAdd";
import Groups from "@mui/icons-material/Groups";
import LibraryBooksOutlined from "@mui/icons-material/LibraryBooksOutlined";
import PostAdd from "@mui/icons-material/PostAdd";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/actions/user";

export default async function NavBar() {
  const user = await getUser();
  return (
    <div className="flex flex-col w-52 max-h-dvh p-6 list-none bg-neutral-950 text-white">
      <div className="mb-8 font-bold">
        <AccountCircle fontSize="small" /> {user?.username}
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <div>
          <span className="font-semibold text-sm text-slate-300">조회</span>
        </div>
        <li>
          <Link href="/main/departments">
            <Domain fontSize="small" /> 학과 목록
          </Link>
        </li>
        <li>
          <Link href="/main/professors">
            <Group fontSize="small" /> 교수 목록
          </Link>
        </li>
        <li>
          <Link href="/main/courses">
            <LibraryBooksOutlined fontSize="small" /> 강의 목록
          </Link>
        </li>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <div>
          <span className="font-semibold text-sm text-slate-300">신규 등록</span>
        </div>
        <li>
          <Link href="/main/departments/new">
            <DomainAdd fontSize="small" /> 학과 추가
          </Link>
        </li>
        <li>
          <Link href="/main/professors/new">
            <GroupAdd fontSize="small" /> 교수 추가
          </Link>
        </li>
        <li>
          <Link href="/main/courses/new">
            <PostAdd fontSize="small" /> 강의 추가
          </Link>
        </li>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <div>
          <span className="font-semibold text-sm text-slate-300">관리</span>
        </div>
        <li>
          <Link href="/main/reviews">
            <Flag fontSize="small" /> 신고 게시물
          </Link>
        </li>
        <li>
          <Link href="/main/users">
            <Groups fontSize="small" /> 유저 관리
          </Link>
        </li>
      </div>
      <LogoutButton />
    </div>
  );
}
