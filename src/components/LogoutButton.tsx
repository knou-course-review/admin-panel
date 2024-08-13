"use client";

import Logout from "@mui/icons-material/Logout";
import { logout } from "@/actions/logout";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <li className="mt-auto self-end">
      <Logout className="cursor-pointer" sx={{ color: "white" }} onClick={handleLogout} />
    </li>
  );
}
