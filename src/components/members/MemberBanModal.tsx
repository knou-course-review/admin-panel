"use client";

import { Button } from "@mui/material";
import ModalFrame from "../ModalFrame";

type MemberBanModalProps = {
  isShowing: boolean;
  username: string;
  closeModal: () => void;
};

export default function MemberBanModal({ isShowing, username, closeModal }: MemberBanModalProps) {
  const handleBan = () => {
    // Request to server
    closeModal();
  };

  if (!isShowing) return null;
  return (
    <ModalFrame title="유저 계정 정지" closeModal={closeModal}>
      <div className="flex flex-col w-96 gap-4 px-4 text-center">
        <p>아래 유저의 계정을 정지 처분합니다.</p>
        <p>{username}</p>
        <Button variant="contained" fullWidth onClick={handleBan}>
          계정 정지
        </Button>
      </div>
    </ModalFrame>
  );
}
