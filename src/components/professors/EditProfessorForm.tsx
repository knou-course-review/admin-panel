"use client";

import { type FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Delete } from "@mui/icons-material";
import { Autocomplete, Button, FormLabel, TextField } from "@mui/material";
import ProfessorDeleteModal from "./ProfessorDeleteModal";
import { deleteProfessor, updateProfessor } from "@/actions/professor";
import { EditContext } from "@/contexts/edit/EditContextProvider";
import type { ProfessorData } from "./ProfessorsContent";

export default function EditProfessorForm() {
  const router = useRouter();
  const [departments, setDepartments] = useState<string[]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] | undefined } | undefined>();
  const { data, updateData } = useContext(EditContext);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://15.164.13.1/api/v1/departments");
        const body = await res.json();
        console.log(body);
        setDepartments(body.data.map((item: { id: number; departmentName: string }) => item.departmentName));
      } catch (e) {
        console.log(e);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElem = e.target as HTMLFormElement;
    const formElemData = new FormData(formElem);
    const formData = {
      professorName: formElemData.get("professorName"),
      departmentName: formElemData.get("departmentName"),
    };
    if (JSON.stringify(formData) === JSON.stringify(data) || !data) return;
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
    if (res.isValid) {
      updateData(null);
      return redirectPage();
    }
    alert(res.error);
  };

  const redirectPage = () => router.push("/professors");

  const openModal = () => setIsShowing(true);

  const closeModal = () => setIsShowing(false);

  if (!data) return null;
  return (
    <>
      <form className="flex flex-col w-96 gap-4" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>교수명</td>
              <td>
                <TextField name="professorName" size="small" defaultValue={(data as ProfessorData).professorName} />
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
        <Button type="submit" variant="contained" disableElevation>
          수정하기
        </Button>
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
