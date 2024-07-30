"use client";

import Close from "@mui/icons-material/Close";
import type { ReactNode } from "react";

type ModalFrameProps = {
  closeModal: () => void;
  title: string;
  children: ReactNode;
};

export default function ModalFrame({ closeModal, title, children }: ModalFrameProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 grid place-content-center">
      <div className="absolute w-full h-full opacity-50 bg-black z-10" onClick={closeModal} />
      <div className="bg-white z-20 p-10 rounded-4xl relative">
        <div className="absolute right-8 top-8">
          <Close className="cursor-pointer" onClick={closeModal} />
        </div>
        <h1 className="text-xl font-bold mb-4">{title}</h1>
        {children}
      </div>
    </div>
  );
}
