"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageNavigator from "../PageNavigator";
import UserTable from "./UserTable";

const fetchAllUsers = (page = 1) => fetch(`/api/users?page=${page}`).then((res) => res.json());

export default function UsersContent() {
  const [page, setPage] = useState(1);
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["all-users", page],
    queryFn: () => fetchAllUsers(page),
    placeholderData: keepPreviousData,
  });

  const refreshData = () => refetch();
  const handlePageSelect = (value: number) => setPage(value);

  if (error) return <div className="flex flex-col gap-4">에러가 발생했습니다!</div>;
  return (
    <>
      <UserTable users={data?.content} isFetching={isFetching} refreshData={refreshData} />
      {data && (
        <PageNavigator currentPage={data.pageNumber} pages={data.totalPages} handlePageSelect={handlePageSelect} />
      )}
    </>
  );
}
