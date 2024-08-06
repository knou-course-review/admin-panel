"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, MenuItem, Select } from "@mui/material";
import CourseTable from "./CourseTable";

export type CourseData = {
  id: number;
  courseName: string;
  departmentName: string;
  professorName: string;
  grade: number;
  credit: number;
  classType: string;
  classification: string;
  semester: string;
};

export default function CoursesContent() {
  const [filterOption, setFilterOption] = useState("학과 선택");
  const [sortOption, setSortOption] = useState("등록순");
  const [data, setData] = useState<CourseData[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://15.164.13.1/api/v1/courses");
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
          <Link href="/courses/new">강의 등록</Link>
        </Button>
        <Select
          size="small"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          disabled={data.length === 0}
        >
          <MenuItem value={"학과 선택"}>학과 선택</MenuItem>
        </Select>
        <Select
          size="small"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          disabled={data.length === 0}
        >
          <MenuItem value={"등록순"}>등록순</MenuItem>
          <MenuItem value={"과목명순"}>과목명순</MenuItem>
          <MenuItem value={"평점순"}>평점순 (미정)</MenuItem>
        </Select>
      </div>
      <CourseTable courses={data} />
    </>
  );
}
