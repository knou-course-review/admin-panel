"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { EditContext } from "@/contexts/edit/EditContextProvider";
import type { CourseData } from "./CoursesContent";

type CourseTableRowProps = {
  courseData: CourseData;
};

export default function CourseTableRow({ courseData }: CourseTableRowProps) {
  const router = useRouter();
  const { updateData } = useContext(EditContext);
  const handleClick = () => {
    updateData(courseData);
    router.push(`/courses/edit/${courseData.id.toString()}`);
  };
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
        <IconButton onClick={handleClick}>
          <Edit fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
