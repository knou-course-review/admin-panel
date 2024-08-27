import Link from "next/link";
import Edit from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import type { CourseData } from "./CoursesContent";

type CourseTableRowProps = {
  courseData: CourseData;
};

export default function CourseTableRow({ courseData }: CourseTableRowProps) {
  return (
    <tr className="border border-neutral-400">
      <td className="p-2">{courseData.courseName}</td>
      <td className="p-2">{courseData.departmentName}</td>
      <td className="p-2">{courseData.professorName}</td>
      <td className="p-2">{courseData.grade}</td>
      <td className="p-2">{courseData.semester}</td>
      <td className="p-2">{courseData.credit}</td>
      <td className="p-2">{courseData.classType}</td>
      <td className="p-2">{courseData.classification}</td>
      <td className="p-2">
        <Link href={`/main/courses/edit/${courseData.id.toString()}`}>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </Link>
      </td>
    </tr>
  );
}
