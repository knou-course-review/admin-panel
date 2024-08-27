"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { addCourse } from "@/actions/course";
import { CLASSIFICATIONS } from "@/constants/classifications";
import { CLASS_TYPES } from "@/constants/class-types";
import { SEMESTERS } from "@/constants/semesters";
import type { DepartmentData } from "../departments/DepartmentsContent";
import type { ProfessorData } from "../professors/ProfessorsContent";

type FormErrors = {
  courseName?: string[] | undefined;
  departmentId?: string[] | undefined;
  professorId?: string[] | undefined;
  grade?: string[] | undefined;
  credit?: string[] | undefined;
  classType?: string[] | undefined;
  classification?: string[] | undefined;
  semester?: string[] | undefined;
  unknown?: string[] | undefined;
};

export default function NewCourseForm() {
  const router = useRouter();
  const [departmentSelected, setDepartmentSelected] = useState<DepartmentData | null>(null);
  const [professorSelected, setProfessorSelected] = useState<ProfessorData | null>(null);
  const {
    data: departmentData,
    isPending: isDepartmentsPending,
    isError: isDepartmentsError,
  } = useQuery({
    queryKey: ["all-departments"],
    queryFn: () => fetch("/api/departments").then((res) => res.json()),
  });
  const { data: professorData, isError: isProfessorsError } = useQuery({
    queryKey: ["all-professors"],
    queryFn: () => fetch("/api/professors").then((res) => res.json()),
  });
  const filteredProfessors = useMemo(() => {
    if (professorData?.data)
      return professorData.data.filter(
        (prof: ProfessorData) => prof.departmentName === departmentSelected?.departmentName
      );
    return [];
  }, [departmentSelected]);
  const [error, setError] = useState<FormErrors>({});

  const handleDepartmentSelect = (_: any, newValue: DepartmentData | null) => {
    if (newValue) {
      setDepartmentSelected(newValue);
    } else {
      setDepartmentSelected(null);
    }
    setProfessorSelected(null);
  };

  const handleProfessorSelect = (_: any, newValue: ProfessorData | null) => {
    if (!newValue) return setProfessorSelected(null);
    setProfessorSelected(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const courseData = {
      courseName: formData.get("courseName") as string,
      departmentId: departmentSelected?.id,
      professorId: professorSelected?.id,
      grade: Number(formData.get("grade") as string),
      credit: Number(formData.get("credit") as string),
      classType: formData.get("classType") as string,
      classification: formData.get("classification") as string,
      semester: formData.get("semester") as string,
    };
    const res = await addCourse(courseData);
    if (res.isValid) return redirectPage();
    if (res.errors) {
      setError(res.errors);
    }
  };

  const redirectPage = () => router.push("/main/courses");

  if (isDepartmentsError || isProfessorsError)
    return (
      <div>
        오류로 인해 강의 등록에 필요한 학과 또는 교수 데이터를 불러올 수 없습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </div>
    );
  return (
    <form className="grid grid-cols-[100px,1fr] w-96 gap-y-3 items-center" onSubmit={handleSubmit}>
      <span className="mt-2 self-start">강의명</span>
      <div>
        <TextField name="courseName" size="small" fullWidth />
        {error.courseName && <FormHelperText error>{error.courseName[0]}</FormHelperText>}
      </div>

      <span className="mt-2 self-start">학과</span>
      <div>
        <Autocomplete
          size="small"
          options={isDepartmentsPending ? [] : departmentData.data}
          getOptionLabel={(option) => option.departmentName}
          value={departmentSelected}
          onChange={handleDepartmentSelect}
          renderInput={(params) => <TextField {...params} name="departmentName" placeholder="학과" />}
        />
        {error.departmentId && <FormHelperText error>{error.departmentId[0]}</FormHelperText>}
      </div>

      <span className="mt-2 self-start">교수</span>
      <div>
        <Autocomplete
          size="small"
          options={filteredProfessors}
          getOptionLabel={(option) => option.professorName}
          value={professorSelected}
          onChange={handleProfessorSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              name="professorName"
              placeholder={
                departmentSelected
                  ? filteredProfessors.length === 0
                    ? "해당 학과에 교수가 없습니다"
                    : "교수"
                  : "학과를 선택해 주세요"
              }
            />
          )}
          disabled={filteredProfessors.length === 0}
        />
        {error.professorId && <FormHelperText error>{error.professorId[0]}</FormHelperText>}
      </div>

      <span>교과구분</span>
      <div>
        <Select name="classification" size="small" defaultValue={CLASSIFICATIONS.major}>
          {Object.values(CLASSIFICATIONS).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </div>

      <span className="mt-2 self-start">학점</span>
      <div>
        <TextField name="credit" size="small" placeholder="예: 3" fullWidth InputProps={{ endAdornment: "점" }} />
        {error.credit && <FormHelperText error>{error.credit[0]}</FormHelperText>}
      </div>

      <span>유형</span>
      <div>
        <Select name="classType" size="small" defaultValue={CLASS_TYPES.physical}>
          {Object.values(CLASS_TYPES).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </div>

      <span className="mt-2 self-start">학년 / 학기</span>
      <div>
        <div className="flex gap-2 items-center">
          <TextField
            name="grade"
            size="small"
            placeholder={`예: 1`}
            InputProps={{ endAdornment: <span className="whitespace-nowrap">학년</span> }}
          />
          <Select name="semester" size="small" defaultValue={SEMESTERS.first}>
            {Object.values(SEMESTERS).map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </div>
        {error.grade && <FormHelperText error>{error.grade[0]}</FormHelperText>}
      </div>

      <Button className="col-span-2 mt-4" type="submit" variant="contained" disableElevation>
        등록하기
      </Button>
    </form>
  );
}
