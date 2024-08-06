"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";

type PageNavigatorProps = {
  currentPage: number;
  pages: number;
  handlePageSelect: (value: number) => void;
};

const commonClasses = "text-center w-8 h-8 leading-8 rounded-[50px]";
const disabledClasses = "bg-slate-300 cursor-default";
const activeClasses = "bg-transparent cursor-pointer hover:bg-sky-300";

const getButtonArray = (totalBatches: number, currentBatch: number, totalPages: number) =>
  Array.from({ length: currentBatch < totalBatches ? 5 : totalPages % 5 }, (_, i) => i + (currentBatch - 1) * 5 + 1);

export default function PageNavigator({ currentPage, pages, handlePageSelect }: PageNavigatorProps) {
  const [totalBatches] = useState(Math.ceil(pages / 5));
  const [currentBatch, setCurrentBatch] = useState(1);
  const buttons = useMemo(() => getButtonArray(totalBatches, currentBatch, pages), [currentBatch]);

  useEffect(() => {
    handlePageSelect(buttons[0]);
  }, [currentBatch]);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const nextPage = Number(target.textContent);
    handlePageSelect(nextPage);
  };

  const getPrevBatch = () => {
    if (currentBatch === 1) return;
    setCurrentBatch((prev) => prev - 1);
  };

  const getNextBatch = () => {
    if (currentBatch === totalBatches) return;
    setCurrentBatch((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center gap-2 mt-4 items-center">
      <IconButton onClick={getPrevBatch} disabled={currentBatch === 1}>
        <ChevronLeft />
      </IconButton>
      {buttons.map((page) => (
        <div
          className={`${commonClasses} ${page === currentPage ? disabledClasses : activeClasses}`}
          key={page}
          onClick={handleClick}
        >
          {page}
        </div>
      ))}
      <IconButton onClick={getNextBatch} disabled={currentBatch === totalBatches}>
        <ChevronRight />
      </IconButton>
    </div>
  );
}
