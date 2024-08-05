"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, MenuItem, Select } from "@mui/material";
import DepartmentTable from "./DepartmentTable";

export type DepartmentData = {
  id: number;
  departmentName: string;
};

export default function DepartmentsContent() {
  const [sortOption, setSortOption] = useState("등록순");
  const [data, setData] = useState<DepartmentData[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://15.164.13.1/api/v1/departments");
        const body = await res.json();
        console.log(body);
        setData(body.data);
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
          <Link href="/departments/new">학과 등록</Link>
        </Button>
        <Select size="small" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <MenuItem value={"등록순"}>등록순</MenuItem>
          <MenuItem value={"학과명순"}>학과명순</MenuItem>
        </Select>
      </div>
      <DepartmentTable departments={data} />
    </>
  );
}
