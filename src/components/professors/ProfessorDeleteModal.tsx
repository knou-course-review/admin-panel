"use client";

import { Button } from "@mui/material";
import ModalFrame from "../ModalFrame";

type ProfessorDeleteModalProps = {
  isShowing: boolean;
  id: string;
  professorName: string;
  closeModal: () => void;
};

export default function ProfessorDeleteModal({ isShowing, id, professorName, closeModal }: ProfessorDeleteModalProps) {
  const handleDelete = () => {
    // Request to server
    closeModal();
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="교수 삭제" closeModal={closeModal}>
      <div className="flex flex-col w-96 gap-4 px-4 text-center">
        <p>아래 교수를 데이터베이스에서 삭제합니다.</p>
        <p>{professorName}</p>
        <Button variant="contained" fullWidth onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </ModalFrame>
  );
}
