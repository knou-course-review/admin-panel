"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { addDepartment } from "@/actions/department";

export default function NewDepartmentForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<string[] | undefined>();
  // const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  // if (isRegistered)
  //   return (
  //     <div className="flex flex-col w-60 h-36 justify-between items-center">
  //       <p>
  //         <strong>[]</strong> 학과가 등록되었습니다!
  //       </p>
  //       <div className="flex gap-2">
  //         <Button variant="contained" disableElevation>
  //           <Link href={"/departments"}>목록으로</Link>
  //         </Button>
  //         <Button variant="contained" onClick={refreshPage} disableElevation>
  //           추가 등록
  //         </Button>
  //       </div>
  //     </div>
  //   );
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
