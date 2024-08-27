"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import ErrorTable from "../common/ErrorTable";
import ProfessorTable from "./ProfessorTable";

export type ProfessorData = {
  id: number;
  professorName: string;
  departmentName: string;
};

export default function ProfessorsContent() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["all-professors"],
    queryFn: () => fetch("/api/professors").then((res) => res.json()),
  });

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button variant="contained" className="mr-auto" disableElevation>
          <Link href="/main/professors/new">교수 등록</Link>
        </Button>
      </div>
      {isPending ? (
        <div className="w-full text-center">Loading...</div>
      ) : isError ? (
        <ErrorTable />
      ) : (
        <ProfessorTable professors={data.data} />
      )}
    </>
  );
}
