"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { addProfessor } from "@/actions/professor";
import type { DepartmentData } from "../departments/DepartmentsContent";

type FormErrors = {
  professorName?: string[] | undefined;
  departmentName?: string[] | undefined;
  unknown?: string[] | undefined;
};

export default function NewProfessorForm() {
  const router = useRouter();
  const { data, isPending, isError } = useQuery({
    queryKey: ["all-departments"],
    queryFn: () => fetch("/api/departments").then((res) => res.json()),
  });
  const [error, setError] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const professorData = {
      professorName: formData.get("professorName"),
      departmentName: formData.get("departmentName"),
    };
    const res = await addProfessor(professorData);
    if (res.isValid) return redirectPage();
    if (res.errors) return setError(res.errors);
  };

  const redirectPage = () => router.push("/main/professors");

  if (isError)
    return (
      <div>
        오류로 인해 교수 등록에 필요한 학과 데이터를 불러올 수 없습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </div>
    );
  return (
    <form className="grid grid-cols-[100px,1fr] w-96 gap-y-3 items-center" onSubmit={handleSubmit}>
      <span className="mt-2 self-start">교수명</span>
      <div>
        <TextField name="professorName" size="small" fullWidth />
        {error.professorName && <FormHelperText error>{error.professorName[0]}</FormHelperText>}
      </div>

      <span className="mt-2 self-start">학과명</span>
      <div>
        <Autocomplete
          size="small"
          options={isPending ? [] : data.data}
          getOptionLabel={(option: DepartmentData) => option.departmentName}
          renderInput={(params) => <TextField {...params} name="departmentName" placeholder="학과" />}
        />
        {error.departmentName && <FormHelperText error>{error.departmentName[0]}</FormHelperText>}
      </div>
      {error.unknown && <FormHelperText error>{error.unknown[0]}</FormHelperText>}
      <Button className="col-span-2 mt-4" type="submit" variant="contained" disableElevation>
        등록하기
      </Button>
    </form>
  );
}
