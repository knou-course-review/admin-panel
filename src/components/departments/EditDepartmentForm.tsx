"use client";

import { useContext, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import DepartmentDeleteModal from "./DepartmentDeleteModal";
import { deleteDepartment, updateDepartment } from "@/actions/department";
import { EditContext } from "@/contexts/edit/EditContextProvider";
import type { DepartmentData } from "./DepartmentsContent";

export default function EditDepartmentForm() {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);
  const [errors, setErrors] = useState<string[] | undefined>();
  const { data, updateData } = useContext(EditContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElem = e.target as HTMLFormElement;
    const formElemData = new FormData(formElem);
    const formData = {
      departmentName: formElemData.get("departmentName"),
    };
    if (JSON.stringify(formData) === JSON.stringify(data) || !data) return;
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
    if (res.isValid) {
      updateData(null);
      return redirectPage();
    }
    alert(res.error);
  };

  const redirectPage = () => router.push("/departments");

  const openModal = () => setIsShowing(true);

  const closeModal = () => setIsShowing(false);

  if (!data) return null;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>학과명</td>
              <td>
                <TextField name="departmentName" size="small" defaultValue={data.departmentName} />
              </td>
            </tr>
          </tbody>
        </table>
        {errors && <p>{errors[0]}</p>}
        <Button variant="contained" onClick={openModal} disableElevation>
          삭제
        </Button>
        <Button type="submit" variant="contained" disableElevation>
          등록하기
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
