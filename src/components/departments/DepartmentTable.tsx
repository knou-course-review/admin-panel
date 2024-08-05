"use client";

import { useState } from "react";
import DepartmentTableRow from "./DepartmentTableRow";
import { DepartmentData } from "./DepartmentsContent";
import DepartmentDeleteModal from "./DepartmentDeleteModal";

type DepartmentTableProps = {
  departments: DepartmentData[];
};

export default function DepartmentTable({ departments }: DepartmentTableProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<null | { id: string; departmentName: string }>(null);

  const openModal = (id: string, departmentName: string) => {
    setIsShowing(true);
    setSelectedDepartment({ id, departmentName });
  };
  const closeModal = () => setIsShowing(false);

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
            <DepartmentTableRow key={data.id} departmentData={{ ...data }} openModal={openModal} />
          ))}
        </tbody>
      </table>
      {isShowing && selectedDepartment && (
        <DepartmentDeleteModal
          isShowing={isShowing}
          id={selectedDepartment.id}
          departmentName={selectedDepartment.departmentName}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
