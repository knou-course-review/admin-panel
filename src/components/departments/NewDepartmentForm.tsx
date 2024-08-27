"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import { addDepartment } from "@/actions/department";

type FormErrors = {
  departmentName?: string[] | undefined;
  unknown?: string[] | undefined;
};

export default function NewDepartmentForm() {
  const router = useRouter();
  const [error, setError] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElem = e.target as HTMLFormElement;
    const res = await addDepartment(new FormData(formElem));
    if (res.isValid) return redirectPage();
    if (res.errors) return setError(res.errors);
  };

  const redirectPage = () => router.push("/main/departments");

  return (
    <form className="grid grid-cols-[100px,1fr] w-96 gap-y-3 items-center" onSubmit={handleSubmit}>
      <span className="mt-2 self-start">학과명</span>
      <div>
        <TextField name="departmentName" size="small" fullWidth />
        {error.departmentName && <FormHelperText error>{error.departmentName[0]}</FormHelperText>}
        {error.unknown && <FormHelperText error>{error.unknown[0]}</FormHelperText>}
      </div>
      <Button className="col-span-2 mt-4" type="submit" variant="contained" disableElevation>
        등록하기
      </Button>
    </form>
  );
}
