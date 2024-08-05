"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { EditContext } from "@/contexts/edit/EditContextProvider";
import type { ProfessorData } from "./ProfessorsContent";

export type ProfessorTableRowProps = {
  professorData: ProfessorData;
};

export default function ProfessorTableRow({ professorData }: ProfessorTableRowProps) {
  const router = useRouter();
  const { updateData } = useContext(EditContext);
  const handleClick = () => {
    updateData(professorData);
    router.push(`/professors/edit/${professorData.id.toString()}`);
  };
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{professorData.professorName}</td>
      <td className="p-2">{professorData.departmentName}</td>
      <td className="p-2">
        <IconButton onClick={handleClick}>
          <Edit fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
