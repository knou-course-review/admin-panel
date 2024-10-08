import Link from "next/link";
import Edit from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import type { ProfessorData } from "./ProfessorsContent";

export type ProfessorTableRowProps = {
  professorData: ProfessorData;
};

export default function ProfessorTableRow({ professorData }: ProfessorTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{professorData.professorName}</td>
      <td className="p-2">{professorData.departmentName}</td>
      <td className="p-2">
        <Link href={`/main/professors/edit/${professorData.id.toString()}`}>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </Link>
      </td>
    </tr>
  );
}
