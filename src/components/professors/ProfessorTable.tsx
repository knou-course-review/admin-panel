import ProfessorTableRow from "./ProfessorTableRow";
import type { ProfessorData } from "./ProfessorsContent";

type ProfessorTableProps = {
  professors: ProfessorData[];
};

export default function ProfessorTable({ professors }: ProfessorTableProps) {
  if (professors.length < 1) return <div className="w-full text-center">현재 등록된 교수가 없습니다.</div>;
  return (
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
          <ProfessorTableRow key={data.id} professorData={{ ...data }} />
        ))}
      </tbody>
    </table>
  );
}
