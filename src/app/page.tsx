import { redirect } from "next/navigation";
import LoginForm from "@/components/login/LoginForm";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const userSession = await getSession();
  if (userSession.isLoggedIn && userSession.payload?.role === "ADMIN") redirect("/main");
  return (
    <div className="grid w-dvw min-h-dvh place-content-center">
      <h1 className="font-bold text-lg mb-8 text-center">KNOUK 어드민 패널</h1>
      <LoginForm />
    </div>
  );
}
