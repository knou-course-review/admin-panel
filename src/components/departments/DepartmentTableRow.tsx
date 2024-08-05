"use client";

import Link from "next/link";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { DepartmentData } from "./DepartmentsContent";

export type DepartmentTableRowProps = {
  departmentData: DepartmentData;
  openModal: (id: string, departmentName: string) => void;
};

export default function DepartmentTableRow({ departmentData, openModal }: DepartmentTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{departmentData.departmentName}</td>
      <td className="p-2">
        <Link href={`/professors/edit/${departmentData.id.toString()}`}>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </Link>
        <IconButton onClick={() => openModal(departmentData.id.toString(), departmentData.departmentName)}>
          <Delete fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
