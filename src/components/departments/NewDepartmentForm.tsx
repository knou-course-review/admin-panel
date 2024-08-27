"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { addDepartment } from "@/actions/department";

export default function NewDepartmentForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[] | undefined>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElem = e.target as HTMLFormElement;
    const res = await addDepartment(new FormData(formElem));
    if (res.isValid) {
      return redirectPage();
    }
    if (res.errors) {
      return setErrors(res.errors.departmentName);
    }
    setErrors(["* 오류가 발생했습니다. 나중에 다시 시도해 주세요."]);
  };

  const redirectPage = () => router.push("/main/departments");

  return (
    <form className="flex flex-col w-96 gap-4" onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>학과명</td>
            <td>
              <TextField name="departmentName" size="small" />
            </td>
          </tr>
        </tbody>
      </table>
      {errors && <p>{errors[0]}</p>}
      <Button type="submit" variant="contained" disableElevation>
        등록하기
      </Button>
    </form>
  );
}
