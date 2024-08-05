"use client";

import Link from "next/link";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { ProfessorData } from "./ProfessorsContent";

export type ProfessorTableRowProps = {
  professorData: ProfessorData;
  openModal: (id: string, professorName: string) => void;
};

export default function ProfessorTableRow({ professorData, openModal }: ProfessorTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{professorData.professorName}</td>
      <td className="p-2">{professorData.departmentName}</td>
      <td className="p-2">
        <Link href={`/professors/edit/${professorData.id.toString()}`}>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </Link>
        <IconButton onClick={() => openModal(professorData.id.toString(), professorData.professorName)}>
          <Delete fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
