"use client";

import { useState } from "react";
import CourseTableRow from "./CourseTableRow";
import type { CourseData } from "./CoursesContent";
import CourseDeleteModal from "./CourseDeleteModal";

type CourseTableProps = {
  courses: CourseData[];
};

export default function CourseTable({ courses }: CourseTableProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<null | { id: string; courseName: string }>(null);

  const openModal = (id: string, courseName: string) => {
    setIsShowing(true);
    setSelectedCourse({ id, courseName });
  };
  const closeModal = () => setIsShowing(false);

  if (courses.length < 1) return <div className="w-full text-center">현재 등록된 강의가 없습니다.</div>;
  return (
    <>
      <table className="table-fixed w-full text-center">
        <thead>
          <tr className="border border-b-2 font-bold border-r-neutral-300 border-l-neutral-300 border-t-neutral-300 border-neutral-400 bg-neutral-300 dark:bg-neutral-700">
            <td className="xl:w-1/3 p-4">강의</td>
            <td className="w-32 p-4">학과</td>
            <td className="p-4">교수</td>
            {/* <td className="p-4">학년</td>
            <td className="p-4">학기</td>
            <td className="p-4">학점</td>
            <td className="p-4">수업유형</td>
            <td className="p-4">교과</td> */}
            <td className="w-24"></td>
          </tr>
        </thead>
        <tbody>
          {courses.map((data) => (
            <CourseTableRow key={data.id} courseData={{ ...data }} openModal={openModal} />
          ))}
        </tbody>
      </table>
      {isShowing && selectedCourse && (
        <CourseDeleteModal
          isShowing={isShowing}
          id={selectedCourse.id}
          courseName={selectedCourse.courseName}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
