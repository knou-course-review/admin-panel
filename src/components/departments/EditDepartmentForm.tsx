"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import DepartmentDeleteModal from "./DepartmentDeleteModal";
import { deleteDepartment, updateDepartment } from "@/actions/department";
import type { DepartmentData } from "./DepartmentsContent";

type FormErrors = {
  departmentName?: string[] | undefined;
  unknown?: string[] | undefined;
};

export default function EditDepartmentForm({ departmentId }: { departmentId: string }) {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);
  const { data, isPending, isError } = useQuery({
    queryKey: ["department", departmentId],
    queryFn: () => fetch(`/api/departments?id=${departmentId}`).then((res) => res.json()),
  });
  const [error, setError] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const editedData = {
      departmentName: formData.get("departmentName"),
    };
    if (JSON.stringify(editedData) === JSON.stringify({ departmentName: data.data.departmentName })) return;
    const res = await updateDepartment(departmentId, editedData);
    if (res.isValid) return redirectPage();
    if (res.errors) return setError(res.errors);
  };

  const handleDelete = async () => {
    if (!data) return;
    const res = await deleteDepartment(departmentId);
    if (res.isValid) return redirectPage();
    alert(res.error);
  };

  const redirectPage = () => router.push("/main/departments");

  const openModal = () => setIsShowing(true);

  const closeModal = () => setIsShowing(false);

  if (isPending) return null;
  if (!data || isError) return redirect("/main/departments");
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">학과 정보 수정</h1>
      <form className="grid grid-cols-[100px,1fr] w-96 gap-y-3 items-center" onSubmit={handleSubmit}>
        <span className="mt-2 self-start">학과명</span>
        <div>
          <TextField name="departmentName" size="small" defaultValue={data.data.departmentName} fullWidth />
          {error.departmentName && <FormHelperText error>{error.departmentName[0]}</FormHelperText>}
          {error.unknown && <FormHelperText error>{error.unknown[0]}</FormHelperText>}
        </div>
        <div className="col-span-2 flex">
          <Button className="ml-auto" variant="text" onClick={openModal} disableElevation>
            <Delete fontSize="small" /> 삭제
          </Button>
        </div>
        <div className="col-span-2 flex gap-4">
          <Button onClick={redirectPage} variant="contained" fullWidth disableElevation>
            취소
          </Button>
          <Button type="submit" variant="contained" fullWidth disableElevation>
            수정하기
          </Button>
        </div>
      </form>
      {isShowing && data && (
        <DepartmentDeleteModal
          isShowing={isShowing}
          departmentName={data.data.departmentName}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
