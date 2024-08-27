"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete, Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import useForm from "@/hooks/useForm";
import { addCourse } from "@/actions/course";
import { NUMBER_REGEX } from "@/utils/regex";
import { CLASSIFICATIONS } from "@/constants/classifications";
import { CLASS_TYPES } from "@/constants/class-types";
import { SEMESTERS } from "@/constants/semesters";
import type { DepartmentData } from "../departments/DepartmentsContent";
import type { ProfessorData } from "../professors/ProfessorsContent";

const initValues = [
  { key: "courseName", value: "" },
  { key: "departmentId", value: null },
  { key: "professorId", value: null },
  { key: "grade", value: null },
  { key: "credit", value: null },
  { key: "classType", value: "출석" },
  { key: "classification", value: "전공" },
  { key: "semester", value: "1학기" },
];

export default function NewCourseForm() {
  const router = useRouter();
  const { formData, updateFormData } = useForm(initValues);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [allProfessors, setAllProfessors] = useState<ProfessorData[]>([]);
  const [departmentSelected, setDepartmentSelected] = useState<DepartmentData | null>(null);
  const [professorSelected, setProfessorSelected] = useState<ProfessorData | null>(null);
  const filteredProfessors = useMemo(
    () => allProfessors.filter((prof) => prof.departmentName === departmentSelected?.departmentName),
    [departmentSelected]
  );
  const [error, setError] = useState({ isError: false, msg: "" });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments");
        const body = await res.json();
        setDepartments(body.data);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchProfessors = async () => {
      try {
        const res = await fetch("/api/professors");
        const body = await res.json();
        setAllProfessors(body.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchDepartments();
    fetchProfessors();
  }, []);

  const handleInput = (key: string, input: string) => {
    if (key === "grade" || key === "credit") {
      if (!NUMBER_REGEX.test(input)) return;
      return updateFormData(key, Number(input));
    }
    updateFormData(key, input);
  };

  const handleDepartmentSelect = (_: any, newValue: DepartmentData | null) => {
    if (newValue) {
      updateFormData("departmentId", newValue.id);
      setDepartmentSelected(newValue);
    } else {
      updateFormData("departmentId", null);
      setDepartmentSelected(null);
    }
    updateFormData("professorId", null);
    setProfessorSelected(null);
  };

  const handleProfessorSelect = (_: any, newValue: ProfessorData | null) => {
    if (!newValue) {
      updateFormData("professorId", null);
      setDepartmentSelected(null);
      return;
    }
    updateFormData("professorId", newValue.id);
    setProfessorSelected(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = {
      courseName: formData.courseName.value as string,
      departmentId: formData.departmentId.value as number,
      professorId: formData.professorId.value as number,
      grade: formData.grade.value as number,
      credit: formData.credit.value as number,
      classType: formData.classType.value as string,
      classification: formData.classification.value as string,
      semester: formData.semester.value as string,
    };
    const res = await addCourse(courseData);
    if (res.isValid) {
      return redirectPage();
    }
    if (res.errors) {
      return handleErrors(res.errors);
    }
    setError({ isError: true, msg: "* 오류가 발생했습니다. 나중에 다시 시도해 주세요." });
  };

  const redirectPage = () => router.push("/main/courses");

  const handleErrors = (errors: { [key: string]: string[] }) => {
    const keys = Object.keys(errors);
    keys.forEach((key) => updateFormData(key, formData[key].value, true, errors[key]![0]));
  };

  return (
    <form className="flex flex-col w-96 gap-4" onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>강의명</td>
            <td>
              <TextField
                size="small"
                value={formData.courseName.value}
                onChange={(e) => handleInput("courseName", e.target.value)}
              />
              <br />
              {formData.courseName.error && <FormLabel error>{formData.courseName.errorMsg}</FormLabel>}
            </td>
          </tr>
          <tr>
            <td>학과</td>
            <td>
              <Autocomplete
                size="small"
                options={departments}
                getOptionLabel={(option) => option.departmentName}
                value={departmentSelected}
                onChange={handleDepartmentSelect}
                renderInput={(params) => <TextField {...params} name="departmentName" label="학과" />}
              />
              <br />
              {formData.departmentId.error && <FormLabel error>{formData.departmentId.errorMsg}</FormLabel>}
            </td>
          </tr>
          <tr>
            <td>교수</td>
            <td>
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
                    label={
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
              <br />
              {formData.professorId.error && <FormLabel error>{formData.professorId.errorMsg}</FormLabel>}
            </td>
          </tr>
          <tr>
            <td>교과구분</td>
            <td>
              <Select
                size="small"
                value={formData.classification.value}
                onChange={(e) => updateFormData("classification", e.target.value)}
              >
                {Object.values(CLASSIFICATIONS).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
              <br />
              {formData.classification.error && <FormLabel error>{formData.classification.errorMsg}</FormLabel>}
            </td>
          </tr>
          <tr>
            <td>학점</td>
            <td>
              <TextField
                size="small"
                placeholder="예: 3"
                value={formData.credit.value ?? ""}
                onChange={(e) => handleInput("credit", e.target.value)}
              />
              <br />
              {formData.credit.error && <FormLabel error>{formData.credit.errorMsg}</FormLabel>}
            </td>
          </tr>
          <tr>
            <td>유형</td>
            <td>
              <Select
                size="small"
                value={formData.classType.value}
                onChange={(e) => updateFormData("classType", e.target.value)}
              >
                {Object.values(CLASS_TYPES).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </td>
          </tr>
          <tr>
            <td>학년 / 학기</td>
            <td>
              <TextField
                size="small"
                placeholder={`예: 1`}
                value={formData.grade.value ?? ""}
                onChange={(e) => handleInput("grade", e.target.value)}
              />
              <Select
                size="small"
                value={formData.semester.value}
                onChange={(e) => updateFormData("semester", e.target.value)}
              >
                {Object.values(SEMESTERS).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
              <br />
              {formData.grade.error && <FormLabel error>{formData.grade.errorMsg}</FormLabel>}
            </td>
          </tr>
        </tbody>
      </table>
      <Button type="submit" variant="contained" disableElevation>
        등록하기
      </Button>
    </form>
  );
}
