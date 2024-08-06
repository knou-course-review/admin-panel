"use client";

import DepartmentTableRow from "./DepartmentTableRow";
import type { DepartmentData } from "./DepartmentsContent";

type DepartmentTableProps = {
  departments: DepartmentData[];
};

export default function DepartmentTable({ departments }: DepartmentTableProps) {
  if (departments.length < 1) return <div className="w-full text-center">현재 등록된 학과가 없습니다.</div>;
  return (
    <>
      <table className="table-fixed w-full text-center">
        <thead>
          <tr className="border border-b-2 font-bold border-r-neutral-300 border-l-neutral-300 border-t-neutral-300 border-neutral-400 bg-neutral-300 dark:bg-neutral-700">
            <td className="p-4">학과</td>
            <td className="w-24"></td>
          </tr>
        </thead>
        <tbody>
          {departments.map((data) => (
            <DepartmentTableRow key={data.id} departmentData={{ ...data }} />
          ))}
        </tbody>
      </table>
    </>
  );
}
