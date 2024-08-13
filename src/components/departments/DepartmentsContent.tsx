"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import DepartmentTable from "./DepartmentTable";

export type DepartmentData = {
  id: number;
  departmentName: string;
};

export default function DepartmentsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DepartmentData[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/departments");
        const body = await res.json();
        if (body.data) setData(body.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button variant="contained" className="mr-auto" disableElevation>
          <Link href="/main/departments/new">학과 등록</Link>
        </Button>
      </div>
      {isLoading ? <div className="w-full text-center">Loading...</div> : <DepartmentTable departments={data} />}
    </>
  );
}
