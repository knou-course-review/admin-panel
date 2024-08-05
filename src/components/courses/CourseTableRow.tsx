"use client";

import Link from "next/link";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { CourseData } from "./CoursesContent";

type CourseTableRowProps = {
  courseData: CourseData;
  openModal: (id: string, courseName: string) => void;
};

export default function CourseTableRow({ courseData, openModal }: CourseTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{courseData.courseName}</td>
      <td className="p-2">{courseData.departmentName}</td>
      <td className="p-2">{courseData.professorName}</td>
      {/* <td className="p-2">{courseData.grade}</td>
      <td className="p-2">{courseData.semester}</td>
      <td className="p-2">{courseData.credit}</td>
      <td className="p-2">{courseData.classType}</td>
      <td className="p-2">{courseData.classification}</td> */}
      <td className="p-2">
        <Link href={`/courses/edit/${courseData.id.toString()}`}>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </Link>
        <IconButton onClick={() => openModal(courseData.id.toString(), courseData.courseName)}>
          <Delete fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
