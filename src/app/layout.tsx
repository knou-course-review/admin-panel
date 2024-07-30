import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/login/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KNOU 어드민패널",
  description: "KNOU 관리자 페이지 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid grid-cols-[1fr_auto] overflow-hidden">
          <NavBar />
          <main className="overflow-auto h-dvh">{children}</main>
        </div>
      </body>
    </html>
  );
}
