import EditDepartmentForm from "@/components/departments/EditDepartmentForm";

export default function EditDepartment({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <EditDepartmentForm departmentId={id} />
    </div>
  );
}
