import { useState } from "react";

type UseFormProps = { key: string; value: CourseFormValue }[];
type FormStateProps<T> = {
  [key: string]: {
    value: T;
    error: boolean;
    errorMsg: string;
  };
};

type CourseFormValue = string | number | null;

const createFormData = (initialKeyValues: UseFormProps) => {
  return initialKeyValues.reduce<FormStateProps<CourseFormValue>>((state, { key, value }) => {
    state[key] = { value, error: false, errorMsg: "" };
    return state;
  }, {});
};

export default function useForm(initialKeyValues: UseFormProps) {
  const [formData, setFormData] = useState(createFormData(initialKeyValues));

  const updateFormData = (key: string, value: CourseFormValue, error: boolean = false, errorMsg: string = "") => {
    setFormData((prev) => {
      const newData = { ...prev };
      newData[key as keyof FormStateProps<CourseFormValue>] = { value, error, errorMsg };
      return newData;
    });
  };

  return { formData, updateFormData };
}
