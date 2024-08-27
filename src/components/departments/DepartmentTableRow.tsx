import Link from "next/link";
import Edit from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import type { DepartmentData } from "./DepartmentsContent";

export type DepartmentTableRowProps = {
  departmentData: DepartmentData;
};

export default function DepartmentTableRow({ departmentData }: DepartmentTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{departmentData.departmentName}</td>
      <td className="p-2">
        <Link href={`/main/departments/edit/${departmentData.id.toString()}`}>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </Link>
      </td>
    </tr>
  );
}
