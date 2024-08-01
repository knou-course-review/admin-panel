"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, MenuItem, Select } from "@mui/material";
import CourseTable from "./CourseTable";

export default function CoursesContent() {
  const [filterOption, setFilterOption] = useState("학과 선택");
  const [sortOption, setSortOption] = useState("과목명순");
  // 데이터 fetch
  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button variant="contained" className="mr-auto">
          <Link href="/courses/new">강의 등록</Link>
        </Button>
        <Select size="small" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
          <MenuItem value={"학과 선택"}>학과 선택</MenuItem>
        </Select>
        <Select size="small" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <MenuItem value={"과목명순"}>과목명순</MenuItem>
          <MenuItem value={"평점순"}>평점순 (미정)</MenuItem>
        </Select>
      </div>
      <CourseTable />
    </>
  );
}
