"use client";

import { useEffect, useMemo, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Delete from "@mui/icons-material/Delete";
import { Autocomplete, Button, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import CourseDeleteModal from "./CourseDeleteModal";
import { deleteCourse, updateCourse } from "@/actions/course";
import { CLASSIFICATIONS } from "@/constants/classifications";
import { CLASS_TYPES } from "@/constants/class-types";
import { SEMESTERS } from "@/constants/semesters";
import type { DepartmentData } from "../departments/DepartmentsContent";
import type { ProfessorData } from "../professors/ProfessorsContent";

export type CourseFormData = {
  id: number;
  courseName: string;
  departmentId: number;
  departmentName: string;
  professorId: number;
  professorName: string;
  grade: number;
  credit: number;
  classType: string;
  classification: string;
  semester: string;
};

export default function EditCourseForm({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [data, setData] = useState<CourseFormData | null>(null);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [allProfessors, setAllProfessors] = useState<ProfessorData[]>([]);
  const [departmentSelected, setDepartmentSelected] = useState<DepartmentData | null>(null);
  const [professorSelected, setProfessorSelected] = useState<ProfessorData | null>(null);
  const filteredProfessors = useMemo(
    () => allProfessors.filter((prof) => prof.departmentName === departmentSelected?.departmentName),
    [departmentSelected, allProfessors]
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isShowing, setIsShowing] = useState(false);
  const [error, setError] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`/api/courses?id=${courseId}`);
      const body = await res.json();
      if (body.data) {
        setData(body.data);
        setDepartmentSelected({ id: body.data.departmentId, departmentName: body.data.departmentName });
        setProfessorSelected({
          id: body.data.professorId,
          professorName: body.data.professorName,
          departmentName: body.data.departmentName,
        });
      }
    };

    const fetchDepartments = async () => {
      try {
        const res = await fetch("/api/departments");
        const body = await res.json();
        if (body.data) setDepartments(body.data);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchProfessors = async () => {
      try {
        const res = await fetch("/api/professors");
        const body = await res.json();
        if (body.data) setAllProfessors(body.data);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchAll = async () => {
      await fetchDepartments();
      await fetchProfessors();
      await fetchCourse();
      setIsLoading(false);
    };

    fetchAll();
  }, []);

  const handleDepartmentSelect = (_: any, newValue: DepartmentData | null) => {
    if (newValue) {
      setDepartmentSelected(newValue);
    } else {
      setDepartmentSelected(null);
    }
    setProfessorSelected(null);
  };

  const handleProfessorSelect = (_: any, newValue: ProfessorData | null) => {
    if (!newValue) {
      setDepartmentSelected(null);
      return;
    }
    setProfessorSelected(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const courseData = {
      courseName: formData.get("courseName"),
      departmentId: departmentSelected?.id,
      professorId: professorSelected?.id,
      grade: Number(formData.get("grade")),
      credit: Number(formData.get("credit")),
      classType: formData.get("classType"),
      classification: formData.get("classification"),
      semester: formData.get("semester"),
    };

    const res = await updateCourse(courseId, courseData);
    if (res?.isValid) {
      return redirectPage();
    }
    if (res?.errors) {
      return setError(res.errors);
    }
    setError({ unknown: ["* 오류가 발생했습니다. 나중에 다시 시도해 주세요."] });
  };

  const handleDelete = async () => {
    if (!data) return;
    const res = await deleteCourse(data.id.toString());
    if (res.isValid) return redirectPage();
    alert(res.error);
  };

  const redirectPage = () => router.push("/main/courses");

  const openModal = () => setIsShowing(true);

  const closeModal = () => setIsShowing(false);

  if (isLoading) return null;
  if (!data) return redirect("/courses");
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">강의 정보 수정</h1>
      <form className="flex flex-col w-96 gap-4" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>강의명</td>
              <td>
                <TextField name="courseName" size="small" defaultValue={data.courseName} />
                <br />
                {error.courseName && <FormLabel error>{error.courseName[0]}</FormLabel>}
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
                  renderInput={(params) => <TextField {...params} label="학과" />}
                />
                <br />
                {error.departmentId && <FormLabel error>{error.departmentId[0]}</FormLabel>}
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
                {error.professorId && <FormLabel error>{error.professorId[0]}</FormLabel>}
              </td>
            </tr>
            <tr>
              <td>교과구분</td>
              <td>
                <Select name="classification" size="small" defaultValue={data.classification}>
                  {Object.values(CLASSIFICATIONS).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <br />
                {error.classification && <FormLabel error>{error.classification[0]}</FormLabel>}
              </td>
            </tr>
            <tr>
              <td>학점</td>
              <td>
                <TextField name="credit" size="small" placeholder="예: 3" defaultValue={data.credit ?? ""} />
                <br />
                {error.credit && <FormLabel error>{error.credit[0]}</FormLabel>}
              </td>
            </tr>
            <tr>
              <td>유형</td>
              <td>
                <Select name="classType" size="small" defaultValue={data.classType}>
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
                <TextField name="grade" size="small" placeholder={`예: 1`} defaultValue={data.grade ?? ""} />
                <Select name="semester" size="small" defaultValue={data.semester}>
                  {Object.values(SEMESTERS).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <br />
                {error.grade && <FormLabel error>{error.grade[0]}</FormLabel>}
              </td>
            </tr>
          </tbody>
        </table>
        {error.unknown && <FormLabel error>{error.unknown[0]}</FormLabel>}
        <p className="self-end">
          <Button variant="text" onClick={openModal} disableElevation>
            <Delete fontSize="small" /> 삭제
          </Button>
        </p>
        <div className="flex gap-4">
          <Button onClick={redirectPage} variant="contained" fullWidth disableElevation>
            취소
          </Button>
          <Button type="submit" variant="contained" fullWidth disableElevation>
            수정하기
          </Button>
        </div>
      </form>
      {isShowing && data && (
        <CourseDeleteModal
          isShowing={isShowing}
          courseName={data.courseName}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </>
  );
}
