"use client";

import { useState } from "react";
import MemberTableRow, { type MemberData } from "./MemberTableRow";
import MemberBanModal from "./MemberBanModal";

export default function MemberTable() {
  const [isShowing, setIsShowing] = useState(false);
  const [selectedMember, setSelectedMember] = useState<null | string>(null);
  const openModal = (username: string) => {
    setSelectedMember(username);
    setIsShowing(true);
  };
  const closeModal = () => setIsShowing(false);
  return (
    <>
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
            <MemberTableRow key={data.id} userData={{ ...data }} openModal={openModal} />
          ))}
        </tbody>
      </table>
      {isShowing && selectedMember && (
        <MemberBanModal isShowing={isShowing} username={selectedMember} closeModal={closeModal} />
      )}
    </>
  );
}

const sampleData: MemberData[] = [
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
