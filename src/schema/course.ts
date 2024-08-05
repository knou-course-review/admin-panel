import { z } from "zod";

export const CourseFormSchema = z.object({
  courseName: z.string().min(1, { message: "* 강의명을 입력해 주세요." }),
  departmentId: z.number({
    required_error: "* 학과를 선택해 주세요.",
    invalid_type_error: "* 학과를 선택해 주세요.",
  }),
  professorId: z.number({
    required_error: "* 교수를 선택해 주세요.",
    invalid_type_error: "* 교수를 선택해 주세요.",
  }),
  grade: z
    .number({
      invalid_type_error: "* 학년은 1~4 사이의 숫자여야 합니다.",
    })
    .positive({ message: "* 학년은 1~4 사이의 숫자여야 합니다." })
    .lte(4, { message: "* 학년은 1~4 사이의 숫자여야 합니다." }),
  credit: z
    .number({
      invalid_type_error: "* 학점은 1~3 사이의 숫자여야 합니다.",
    })
    .positive({ message: "* 학점은 1~3 사이의 숫자여야 합니다." })
    .lte(3, { message: "* 학점은 1~3 사이의 숫자여야 합니다." }),
  classType: z.string().min(1, { message: "* 유형을 선택해 주세요." }),
  classification: z.string().min(1, { message: "* 교과구분을 선택해 주세요." }),
  semester: z.string().min(1, { message: "* 학기를 선택해 주세요." }),
});
