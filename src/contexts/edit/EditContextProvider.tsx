"use client";

import { createContext, useState, type ReactNode } from "react";
import type { DepartmentData } from "@/components/departments/DepartmentsContent";
import type { ProfessorData } from "@/components/professors/ProfessorsContent";

export type EditContextProps = EditContextState;

export type EditContextState = {
  data: EditContextData | null;
  updateData: (newData: EditContextData | null) => void;
};

export type EditContextData = ProfessorData | DepartmentData;

export const EditContext = createContext<EditContextProps>({ data: null, updateData: () => {} });

export const EditContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<EditContextData | null>(null);
  const updateData = (newData: EditContextData | null) => setData(newData);
  return <EditContext.Provider value={{ data, updateData }}>{children}</EditContext.Provider>;
};
