import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-8">👋 Welcome!</h1>
      <p className="mb-4">
        <Link href="https://knous.vercel.app/" target="_blank">
          <strong>KNOU</strong>
        </Link>{" "}
        사이트의 어드민 패널입니다.
      </p>
      <li>KNOU에서 사용하는 데이터를 조회하거나 생성 또는 수정할 수 있습니다.</li>
      <li>
        회원 계정 정지 및 해제는 좌측의 <strong>관리</strong> 메뉴를 이용해 주세요.
      </li>
    </div>
  );
}
