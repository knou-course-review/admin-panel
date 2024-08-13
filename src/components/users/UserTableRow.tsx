"use client";

import Lock from "@mui/icons-material/Lock";
import LockOpen from "@mui/icons-material/LockOpen";
import { IconButton } from "@mui/material";
import type { UserData } from "./UserTable";

export type UserTableRowProps = {
  userData: UserData;
  openModal: (username: string, userId: number, status: string) => void;
};

const extractDate = (string: string) => {
  const [date, time] = string.split("T");
  const [hours] = time.split(".");
  return `${date} @${hours}`;
};

export default function UserTableRow({ userData, openModal }: UserTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{userData.id}</td>
      <td className="p-2">{userData.username}</td>
      <td className="p-2">{userData.email}</td>
      <td className="p-2">{extractDate(userData.createdAt)}</td>
      <td className="p-2">{extractDate(userData.updatedAt)}</td>
      <td className="p-2">{userData.status}</td>
      <td className="p-2">
        <IconButton onClick={() => openModal(userData.username, userData.id, userData.status)}>
          {userData.status === "ACTIVE" ? <Lock fontSize="small" /> : <LockOpen fontSize="small" />}
        </IconButton>
      </td>
    </tr>
  );
}
