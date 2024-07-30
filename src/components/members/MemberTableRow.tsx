"use client";

import { Block } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type MemberStatus = "정상" | "정지";

export type MemberTableRowProps = {
  id: number;
  username: string;
  email: string;
  status: MemberStatus;
};

export default function MemberTableRow(props: MemberTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{props.username}</td>
      <td className="p-2">{props.email}</td>
      <td className="p-2">{props.status}</td>
      <td className="p-2">
        <IconButton>
          <Block fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
