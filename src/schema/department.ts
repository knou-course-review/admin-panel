import { z } from "zod";

export const DepartmentFormSchema = z.object({
  departmentName: z.string().min(1, { message: "* 학과명을 입력해 주세요." }),
});
