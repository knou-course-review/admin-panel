"use client";

import { Button } from "@mui/material";
import ModalFrame from "../ModalFrame";
import { changeUserStatus } from "@/actions/user";

type UserBanModalProps = {
  isShowing: boolean;
  username: string;
  userId: number;
  closeModal: () => void;
  refreshData: () => void;
};

export default function UserBanModal({ isShowing, username, userId, closeModal, refreshData }: UserBanModalProps) {
  const handleClick = async () => {
    const res = await changeUserStatus(userId);
    if (res.isValid) {
      refreshData();
      alert("유저의 상태를 변경했습니다.");
    }
    closeModal();
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="유저 계정 정지" closeModal={closeModal}>
      <div className="flex flex-col w-96 gap-4 px-4 text-center">
        <p>아래 계정을 정지 처분합니다.</p>
        <p>{username}</p>
        <Button variant="contained" onClick={handleClick} fullWidth disableElevation>
          계정 정지
        </Button>
      </div>
    </ModalFrame>
  );
}
