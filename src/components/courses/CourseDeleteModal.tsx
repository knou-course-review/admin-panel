"use client";

import { Button } from "@mui/material";
import ModalFrame from "../ModalFrame";

type CourseDeleteModalProps = {
  isShowing: boolean;
  id: string;
  courseName: string;
  closeModal: () => void;
};

export default function CourseDeleteModal({ isShowing, id, courseName, closeModal }: CourseDeleteModalProps) {
  const handleDelete = () => {
    // Request to server
    closeModal();
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="강의 삭제" closeModal={closeModal}>
      <div className="flex flex-col w-96 gap-4 px-4 text-center">
        <p>아래 강의를 데이터베이스에서 삭제합니다.</p>
        <p>{courseName}</p>
        <Button variant="contained" fullWidth onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </ModalFrame>
  );
}
