"use client";

import { useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import CourseTable from "./CourseTable";
import PageNavigator from "../PageNavigator";

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

const fetchAllCourses = (page = 1) => fetch(`/api/courses?page=${page}`).then((res) => res.json());

export default function CoursesContent() {
  const [page, setPage] = useState(1);
  const { data, error, isFetching } = useQuery({
    queryKey: ["all-courses", page],
    queryFn: () => fetchAllCourses(page),
    placeholderData: keepPreviousData,
  });

  const handlePageSelect = (value: number) => setPage(value);

  if (error) return <div className="flex flex-col gap-4">에러가 발생했습니다!</div>;
  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button variant="contained" className="mr-auto" disableElevation>
          <Link href="/main/courses/new">강의 등록</Link>
        </Button>
      </div>
      <CourseTable courses={data?.content} isFetching={isFetching} />
      {data && (
        <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
      )}
    </>
  );
}
