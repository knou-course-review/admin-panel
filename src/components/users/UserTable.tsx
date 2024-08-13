"use client";

import { useState } from "react";
import UserBanModal from "./UserBanModal";
import UserTableRow from "./UserTableRow";
import UserUnbanModal from "./UserUnbanModal";

type UserStatus = "ACTIVE" | "INACTIVE";

export type UserData = {
  id: number;
  username: string;
  email: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

type UserTableProps = {
  users: UserData[];
  isFetching: boolean;
  refreshData: () => void;
};

export default function UserTable({ users, isFetching, refreshData }: UserTableProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | { username: string; userId: number; status: string }>(null);
  const openModal = (username: string, userId: number, status: string) => {
    setSelectedUser({ username, userId, status });
    setIsShowing(true);
  };
  const closeModal = () => setIsShowing(false);

  if (isFetching) return <div className="w-full text-center">Loading ...</div>;
  return (
    <>
      <table className="table-fixed w-full text-center">
        <thead>
          <tr className="border border-b-2 font-bold border-r-neutral-300 border-l-neutral-300 border-t-neutral-300 border-neutral-400 bg-neutral-300 dark:bg-neutral-700">
            <td className="p-4 w-32">id</td>
            <td className="p-4">유저명</td>
            <td className="p-4">이메일</td>
            <td className="p-4 w-56">생성일</td>
            <td className="p-4 w-56">수정일</td>
            <td className="p-4 w-32">상태</td>
            <td className="w-20"></td>
          </tr>
        </thead>
        <tbody>
          {users.map((data) => (
            <UserTableRow key={data.id} userData={{ ...data }} openModal={openModal} />
          ))}
        </tbody>
      </table>
      {isShowing && selectedUser ? (
        selectedUser.status === "ACTIVE" ? (
          <UserBanModal
            isShowing={isShowing}
            username={selectedUser.username}
            userId={selectedUser.userId}
            closeModal={closeModal}
            refreshData={refreshData}
          />
        ) : (
          <UserUnbanModal
            isShowing={isShowing}
            username={selectedUser.username}
            userId={selectedUser.userId}
            closeModal={closeModal}
            refreshData={refreshData}
          />
        )
      ) : null}
    </>
  );
}
