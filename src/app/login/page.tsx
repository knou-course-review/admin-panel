import LoginForm from "@/components/login/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="font-bold text-2xl mb-8">로그인</h1>
      <LoginForm />
    </div>
  );
}
