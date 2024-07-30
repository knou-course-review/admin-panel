"use client";

import CourseTableRow from "./CourseTableRow";

export default function CourseTable() {
  return (
    <table className="table-fixed w-full text-center">
      <thead>
        <tr className="border border-b-2 font-bold border-r-neutral-300 border-l-neutral-300 border-t-neutral-300 border-neutral-400 bg-neutral-300">
          <td className="xl:w-1/3 p-4">과목명</td>
          <td className="p-4">교수</td>
          <td className="p-4">교과</td>
          <td className="w-32 p-4">학과</td>
          <td className="p-4">학년</td>
          <td className="p-4">학기</td>
          <td className="p-4">학점</td>
          <td className="p-4">유형</td>
          <td className="w-24"></td>
        </tr>
      </thead>
      <tbody>
        {sampleData.map((data) => (
          <CourseTableRow key={data.id} {...data} />
        ))}
      </tbody>
    </table>
  );
}

const sampleData = [
  {
    id: 1,
    courseName: "string",
    professor: "김교수",
    department: "string",
    classification: "전공",
    year: "24학년",
    semester: "1학기",
    units: 4,
    classType: "string",
  },
  {
    id: 2,
    courseName: "string",
    professor: "김교수",
    department: "string",
    classification: "전공",
    year: "24학년",
    semester: "2학기",
    units: 4,
    classType: "string",
  },
  {
    id: 3,
    courseName: "string",
    professor: "김교수",
    department: "string",
    classification: "전공",
    year: "23학년",
    semester: "1학기",
    units: 4,
    classType: "string",
  },
];
