import Link from "next/link";

export default function Home() {
  return (
      <div className="text-center w-full">
        <p className="mb-6">KNOUS 어드민패널 입니다.</p>
        <p>
          <Link href="/login">로그인페이지로 이동 →</Link>
        </p>
      </div>
  );
}
