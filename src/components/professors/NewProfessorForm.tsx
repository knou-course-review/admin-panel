"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, Button, FormLabel, TextField } from "@mui/material";
import { addProfessor } from "@/actions/professor";

export default function NewProfessorForm() {
  const router = useRouter();
  const [departments, setDepartments] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string[] | undefined } | undefined>();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments");
        const body = await res.json();
        setDepartments(body.data.map((item: { id: number; departmentName: string }) => item.departmentName));
      } catch (e) {
        console.log(e);
      }
    };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElem = e.target as HTMLFormElement;
    const res = await addProfessor(new FormData(formElem));
    if (res.isValid) {
      return redirectPage();
    }
    if (res.errors) {
      return setErrors(res.errors);
    }
    setErrors({ unknown: ["* 오류가 발생했습니다. 나중에 다시 시도해 주세요."] });
  };

  const redirectPage = () => router.push("/main/professors");

  return (
    <form className="flex flex-col w-96 gap-4" onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>교수명</td>
            <td>
              <TextField name="professorName" size="small" />
              <FormLabel error>{errors?.professorName && <p>{errors.professorName[0]}</p>}</FormLabel>
            </td>
          </tr>
          <tr>
            <td>학과명</td>
            <td>
              <Autocomplete
                size="small"
                options={departments}
                renderInput={(params) => <TextField {...params} name="departmentName" label="학과" />}
              />
              <FormLabel error>{errors?.departmentName && <p>{errors.departmentName[0]}</p>}</FormLabel>
            </td>
          </tr>
        </tbody>
      </table>
      {errors?.unknown && <p>{errors.unknown[0]}</p>}
      <Button type="submit" variant="contained" disableElevation>
        등록하기
      </Button>
    </form>
  );
}
