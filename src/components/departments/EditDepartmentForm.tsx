"use client";

import { useEffect, useState, type FormEvent } from "react";
import { redirect, useRouter } from "next/navigation";
import { Delete } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import DepartmentDeleteModal from "./DepartmentDeleteModal";
import { deleteDepartment, updateDepartment } from "@/actions/department";
import type { DepartmentData } from "./DepartmentsContent";

export default function EditDepartmentForm({ departmentId }: { departmentId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isShowing, setIsShowing] = useState(false);
  const [errors, setErrors] = useState<string[] | undefined>();
  const [data, setData] = useState<DepartmentData | null>(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      const res = await fetch(`/api/departments?id=${departmentId}`);
      const body = await res.json();
      if (body.data) setData(body.data);
      setIsLoading(false);
    };

    fetchDepartment();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;
    const formElem = e.target as HTMLFormElement;
    const formElemData = new FormData(formElem);
    const formData = {
      departmentName: formElemData.get("departmentName"),
    };
    if (JSON.stringify(formData) === JSON.stringify({ departmentName: data.departmentName })) return;
    const res = await updateDepartment(data.id, formData);
    if (res.isValid) {
      return redirectPage();
    }
    if (res.errors) {
      return setErrors(res.errors.departmentName);
    }
    setErrors(["* 오류가 발생했습니다. 나중에 다시 시도해 주세요."]);
  };

  const handleDelete = async () => {
    if (!data) return;
    const res = await deleteDepartment(data.id.toString());
    if (res.isValid) return redirectPage();
    alert(res.error);
  };

  const redirectPage = () => router.push("/main/departments");

  const openModal = () => setIsShowing(true);

  const closeModal = () => setIsShowing(false);

  if (isLoading) return null;
  if (!data) return redirect("/main/departments");
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">학과 정보 수정</h1>
      <form className="flex flex-col w-96 gap-4" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>학과명</td>
              <td>
                <TextField name="departmentName" size="small" defaultValue={(data as DepartmentData).departmentName} />
              </td>
            </tr>
          </tbody>
        </table>
        {errors && <p>{errors[0]}</p>}
        <p className="self-end">
          <Button variant="text" onClick={openModal} disableElevation>
            <Delete fontSize="small" /> 삭제
          </Button>
        </p>
        <Button type="submit" variant="contained" disableElevation>
          수정하기
        </Button>
      </form>
      {isShowing && data && (
        <DepartmentDeleteModal
          isShowing={isShowing}
          departmentName={(data as DepartmentData).departmentName}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
