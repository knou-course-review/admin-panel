"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { EditContext } from "@/contexts/edit/EditContextProvider";
import type { DepartmentData } from "./DepartmentsContent";

export type DepartmentTableRowProps = {
  departmentData: DepartmentData;
};

export default function DepartmentTableRow({ departmentData }: DepartmentTableRowProps) {
  const router = useRouter();
  const { updateData } = useContext(EditContext);
  const handleClick = () => {
    updateData(departmentData);
    router.push(`/departments/edit/${departmentData.id.toString()}`);
  };
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{departmentData.departmentName}</td>
      <td className="p-2">
        <IconButton onClick={handleClick}>
          <Edit fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
