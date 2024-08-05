"use client";

import { useState } from "react";
import ProfessorTableRow from "./ProfessorTableRow";
import type { ProfessorData } from "./ProfessorsContent";
import ProfessorDeleteModal from "./ProfessorDeleteModal";

type ProfessorTableProps = {
  professors: ProfessorData[];
};

export default function ProfessorTable({ professors }: ProfessorTableProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<null | { id: string; professorName: string }>(null);

  const openModal = (id: string, professorName: string) => {
    setIsShowing(true);
    setSelectedProfessor({ id, professorName });
  };
  const closeModal = () => setIsShowing(false);

  return (
    <>
      <table className="table-fixed w-full text-center">
        <thead>
          <tr className="border border-b-2 font-bold border-r-neutral-300 border-l-neutral-300 border-t-neutral-300 border-neutral-400 bg-neutral-300 dark:bg-neutral-700">
            <td className="xl:w-1/3 p-4">교수</td>
            <td className="p-4">학과</td>
            <td className="w-24"></td>
          </tr>
        </thead>
        <tbody>
          {professors.map((data) => (
            <ProfessorTableRow key={data.id} professorData={{ ...data }} openModal={openModal} />
          ))}
        </tbody>
      </table>
      {isShowing && selectedProfessor && (
        <ProfessorDeleteModal
          isShowing={isShowing}
          id={selectedProfessor.id}
          professorName={selectedProfessor.professorName}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
