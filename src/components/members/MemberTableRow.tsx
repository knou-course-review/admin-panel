"use client";

import { Block } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type MemberStatus = "정상" | "정지";

export type MemberData = {
  id: number;
  username: string;
  email: string;
  status: MemberStatus;
};

export type MemberTableRowProps = {
  userData: MemberData;
  openModal: (username: string) => void;
};

export default function MemberTableRow({ userData, openModal }: MemberTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{userData.username}</td>
      <td className="p-2">{userData.email}</td>
      <td className="p-2">{userData.status}</td>
      <td className="p-2">
        <IconButton onClick={() => openModal(userData.username)}>
          <Block fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
