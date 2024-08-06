import EditCourseForm from "@/components/courses/EditCourseForm";

export default function EditCourse({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <EditCourseForm courseId={id} />
    </div>
  );
}
