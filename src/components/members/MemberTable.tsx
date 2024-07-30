"use client";

import MemberTableRow, { MemberTableRowProps } from "./MemberTableRow";

export default function MemberTable() {
  return (
    <table className="table-fixed w-full text-center">
      <thead>
        <tr className="border border-b-2 font-bold border-r-neutral-300 border-l-neutral-300 border-t-neutral-300 border-neutral-400 bg-neutral-300">
          <td className="p-4">아이디</td>
          <td className="p-4">이메일</td>
          <td className="p-4 w-32">상태</td>
          <td className="w-20"></td>
        </tr>
      </thead>
      <tbody>
        {sampleData.map((data) => (
          <MemberTableRow key={data.id} {...data} />
        ))}
      </tbody>
    </table>
  );
}

const sampleData: MemberTableRowProps[] = [
  {
    id: 1,
    username: "asdf41f6a5w4",
    email: "5ef1e5@knou.ac.kr",
    status: "정상",
  },
  {
    id: 2,
    username: "11111111",
    email: "4654654654@knou.ac.kr",
    status: "정상",
  },
  {
    id: 3,
    username: "wefwefwefef",
    email: "ee_eee@knou.ac.kr",
    status: "정지",
  },
];
