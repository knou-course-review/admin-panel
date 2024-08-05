"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, MenuItem, Select } from "@mui/material";
import ProfessorTable from "./ProfessorTable";

export type ProfessorData = {
  id: number;
  professorName: string;
  departmentName: string;
};

export default function ProfessorsContent() {
  const [data, setData] = useState<ProfessorData[]>([]);
  const [filterOption, setFilterOption] = useState("학과 선택");
  const [sortOption, setSortOption] = useState("등록순");

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch("http://15.164.13.1/api/v1/professors");
        const body = await res.json();
        console.log(body);
        setData(body.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchProfessors();
  }, []);

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button variant="contained" className="mr-auto" disableElevation>
          <Link href="/professors/new">교수 등록</Link>
        </Button>
        <Select size="small" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
          <MenuItem value={"학과 선택"}>학과 선택</MenuItem>
        </Select>
        <Select size="small" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <MenuItem value={"등록순"}>등록순</MenuItem>
          <MenuItem value={"이름순"}>이름순</MenuItem>
        </Select>
      </div>
      <ProfessorTable professors={data} />
    </>
  );
}
