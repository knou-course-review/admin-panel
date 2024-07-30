"use client";

import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type CourseTableRowProps = {
  id: number;
  courseName: string;
  professor: string;
  department: string;
  classification: string;
  year: string;
  semester: string;
  units: number;
  classType: string;
};

export default function CourseTableRow(props: CourseTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{props.courseName}</td>
      <td className="p-2">{props.professor}</td>
      <td className="p-2">{props.classification}</td>
      <td className="p-2">{props.department}</td>
      <td className="p-2">{props.year}</td>
      <td className="p-2">{props.semester}</td>
      <td className="p-2">{props.units}</td>
      <td className="p-2">{props.classType}</td>
      <td className="p-2">
        <IconButton>
          <Edit fontSize="small" />
        </IconButton>
        <IconButton>
          <Delete fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
