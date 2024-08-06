"use client";

import { useEffect, useState, type FormEvent } from "react";
import { redirect, useRouter } from "next/navigation";
import { Delete } from "@mui/icons-material";
import { Autocomplete, Button, FormLabel, TextField } from "@mui/material";
import ProfessorDeleteModal from "./ProfessorDeleteModal";
import { deleteProfessor, updateProfessor } from "@/actions/professor";
import type { ProfessorData } from "./ProfessorsContent";

export default function EditProfessorForm({ professorId }: { professorId: string }) {
  const router = useRouter();
  const [departments, setDepartments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowing, setIsShowing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] | undefined } | undefined>();
  const [data, setData] = useState<ProfessorData | null>(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      const res = await fetch(`/api/professors?id=${professorId}`);
      const body = await res.json();
      if (body.data) setData(body.data);
      setIsLoading(false);
    };

    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments");
        const body = await res.json();
        if (body.data)
          setDepartments(body.data.map((item: { id: number; departmentName: string }) => item.departmentName));
      } catch (e) {
        console.log(e);
      }
    };

    fetchProfessor();
    fetchDepartments();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;
    const formElem = e.target as HTMLFormElement;
    const formElemData = new FormData(formElem);
    const formData = {
      professorName: formElemData.get("professorName"),
      departmentName: formElemData.get("departmentName"),
    };
    if (
      JSON.stringify(formData) ===
        JSON.stringify({ professorName: data.professorName, departmentName: data.departmentName }) ||
      !data
    )
      return;
    const res = await updateProfessor(data.id, formData);
    if (res.isValid) {
      return redirectPage();
    }
    if (res.errors) {
      return setErrors(res.errors);
    }
    setErrors({ unknown: ["* 오류가 발생했습니다. 나중에 다시 시도해 주세요."] });
  };

  const handleDelete = async () => {
    if (!data) return;
    const res = await deleteProfessor(data.id.toString());
    if (res.isValid) return redirectPage();
    alert(res.error);
  };

  const redirectPage = () => router.push("/professors");

  const openModal = () => setIsShowing(true);

  const closeModal = () => setIsShowing(false);

  if (isLoading) return null;
  if (!data) return redirect("/professors");
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">교수 정보 수정</h1>
      <form className="flex flex-col w-96 gap-4" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>교수명</td>
              <td>
                <TextField name="professorName" size="small" defaultValue={data.professorName} />
                <FormLabel error>{errors?.professorName && <p>{errors.professorName[0]}</p>}</FormLabel>
              </td>
            </tr>
            <tr>
              <td>학과명</td>
              <td>
                <Autocomplete
                  size="small"
                  options={departments}
                  defaultValue={(data as ProfessorData).departmentName}
                  renderInput={(params) => <TextField {...params} name="departmentName" label="학과" />}
                />
                <FormLabel error>{errors?.departmentName && <p>{errors.departmentName[0]}</p>}</FormLabel>
              </td>
            </tr>
          </tbody>
        </table>
        {errors?.unknown && <p>{errors.unknown[0]}</p>}
        <p className="self-end">
          <Button variant="text" onClick={openModal} disableElevation>
            <Delete fontSize="small" /> 삭제
          </Button>
        </p>
        <div className="flex gap-4">
          <Button onClick={redirectPage} variant="contained" fullWidth disableElevation>
            취소
          </Button>
          <Button type="submit" variant="contained" fullWidth disableElevation>
            수정하기
          </Button>
        </div>
      </form>
      {isShowing && data && (
        <ProfessorDeleteModal
          isShowing={isShowing}
          professorName={(data as ProfessorData).professorName}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
