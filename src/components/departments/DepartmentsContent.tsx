"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import DepartmentTable from "./DepartmentTable";
import ErrorTable from "../common/ErrorTable";

export type DepartmentData = {
  id: number;
  departmentName: string;
};

export default function DepartmentsContent() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["all-departments"],
    queryFn: () => fetch("/api/departments").then((res) => res.json()),
  });

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button variant="contained" className="mr-auto" disableElevation>
          <Link href="/main/departments/new">학과 등록</Link>
        </Button>
      </div>
      {isPending ? (
        <div className="w-full text-center">Loading...</div>
      ) : isError ? (
        <ErrorTable />
      ) : (
        <DepartmentTable departments={data.data} />
      )}
    </>
  );
}
