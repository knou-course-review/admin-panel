import EditProfessorForm from "@/components/professors/EditProfessorForm";

export default function EditProfessor({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <EditProfessorForm professorId={id} />
    </div>
  );
}
