"use client";

import { Button } from "@mui/material";
import ModalFrame from "../ModalFrame";
import { deleteDepartment } from "@/actions/department";

type DepartmentDeleteModalProps = {
  isShowing: boolean;
  id: string;
  departmentName: string;
  closeModal: () => void;
};

export default function DepartmentDeleteModal({
  isShowing,
  id,
  departmentName,
  closeModal,
}: DepartmentDeleteModalProps) {
  const handleDelete = async () => {
    const res = await deleteDepartment(id);
    if (res.isValid) return closeModal();
    alert(res.error);
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="학과 삭제" closeModal={closeModal}>
      <div className="flex flex-col w-96 gap-4 px-4 text-center">
        <p>아래 학과를 데이터베이스에서 삭제합니다.</p>
        <p>{departmentName}</p>
        <Button variant="contained" fullWidth onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </ModalFrame>
  );
}
