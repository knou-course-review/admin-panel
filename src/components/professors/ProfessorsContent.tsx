"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import ProfessorTable from "./ProfessorTable";

export type ProfessorData = {
  id: number;
  professorName: string;
  departmentName: string;
};

export default function ProfessorsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProfessorData[]>([]);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await fetch("/api/professors");
        const body = await res.json();
        if (body.data) setData(body.data);
        setIsLoading(false);
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
          <Link href="/main/professors/new">교수 등록</Link>
        </Button>
      </div>
      {isLoading ? <div className="w-full text-center">Loading...</div> : <ProfessorTable professors={data} />}
    </>
  );
}
