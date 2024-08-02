import { z } from "zod";

export const ProfessorFormSchema = z.object({
  professorName: z.string().min(1, { message: "* 교수명을 입력해 주세요." }),
  departmentName: z.string().min(1, { message: "* 학과명을 입력해 주세요." }),
});
