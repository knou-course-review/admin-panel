"use client";

import { useMemo, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Delete from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import ProfessorDeleteModal from "./ProfessorDeleteModal";
import { deleteProfessor, updateProfessor } from "@/actions/professor";
import type { DepartmentData } from "../departments/DepartmentsContent";

type FormErrors = {
  professorName?: string[] | undefined;
  departmentName?: string[] | undefined;
  unknown?: string[] | undefined;
};

export default function EditProfessorForm({ professorId }: { professorId: string }) {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);
  const {
    data: departmentData,
    isPending: isDepartmentsPending,
    isError: isDepartmentsError,
  } = useQuery({
    queryKey: ["all-departments"],
    queryFn: () => fetch("/api/departments").then((res) => res.json()),
  });
  const {
    data: professorData,
    isPending: isProfessorPending,
    isError: isProfessorError,
  } = useQuery({
    queryKey: ["professor", professorId],
    queryFn: () => fetch(`/api/professors?id=${professorId}`).then((res) => res.json()),
  });
  const departmentList = useMemo(() => {
    if (departmentData?.data) return departmentData.data.map((department: DepartmentData) => department.departmentName);
    return [];
  }, [departmentData]);
  const [error, setError] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!professorData) return;
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const editedData = {
      professorName: formData.get("professorName"),
      departmentName: formData.get("departmentName"),
    };
    if (
      JSON.stringify(editedData) ===
      JSON.stringify({ professorName: professorData.professorName, departmentName: professorData.departmentName })
    )
      return;
    const res = await updateProfessor(professorId, editedData);
    if (res.isValid) return redirectPage();
    if (res.errors) return setError(res.errors);
  };

  const handleDelete = async () => {
    if (!professorData) return;
    const res = await deleteProfessor(professorId);
    if (res.isValid) return redirectPage();
    alert(res.error);
  };

  const redirectPage = () => router.push("/main/professors");

  const openModal = () => setIsShowing(true);

  const closeModal = () => setIsShowing(false);

  if (isDepartmentsPending || isProfessorPending) return null;
  if (isDepartmentsError)
    return (
      <div>
        오류로 인해 정보 수정에 필요한 학과 데이터를 불러올 수 없습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </div>
    );
  if (!professorData || isProfessorError) return redirect("/main/professors");
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">교수 정보 수정</h1>
      <form className="grid grid-cols-[100px,1fr] w-96 gap-y-3 items-center" onSubmit={handleSubmit}>
        <span className="mt-2 self-start">교수명</span>
        <div>
          <TextField name="professorName" size="small" defaultValue={professorData.data.professorName} fullWidth />
          {error.professorName && <FormHelperText error>{error.professorName[0]}</FormHelperText>}
        </div>

        <span className="mt-2 self-start">학과명</span>
        <div>
          <Autocomplete
            size="small"
            options={departmentList}
            defaultValue={professorData.data.departmentName}
            renderInput={(params) => <TextField {...params} name="departmentName" label="학과" />}
          />
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
      {isShowing && professorData && (
        <ProfessorDeleteModal
          isShowing={isShowing}
          professorName={`${professorData.data.professorName} (${professorData.data.departmentName})`}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
