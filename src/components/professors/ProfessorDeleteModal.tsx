"use client";

import Button from "@mui/material/Button";
import ModalFrame from "../ModalFrame";

type ProfessorDeleteModalProps = {
  isShowing: boolean;
  professorName: string;
  closeModal: () => void;
  handleDelete: () => Promise<void>;
};

export default function ProfessorDeleteModal({
  isShowing,
  professorName,
  handleDelete,
  closeModal,
}: ProfessorDeleteModalProps) {
  const handleClick = () => handleDelete();

  if (!isShowing) return null;
  return (
    <ModalFrame title="교수 삭제" closeModal={closeModal}>
      <div className="flex flex-col w-96 gap-4 px-4 text-center">
        <p>아래 교수를 데이터베이스에서 삭제합니다.</p>
        <p className="mb-4">
          <strong>{professorName}</strong>
        </p>
        <p className="text-sm text-red-600">
          * 삭제를 선택할 경우 데이터는 즉시 삭제되며,
          <br /> 복구할 수 없습니다.
        </p>
        <Button variant="contained" onClick={handleClick} fullWidth disableElevation>
          삭제
        </Button>
      </div>
    </ModalFrame>
  );
}
