import { Inter } from "next/font/google";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import NavBar from "@/components/NavBar";
import TanstackQueryProvider from "@/contexts/tanstack/TanstackQueryProvider";
import ThemeContextProvider from "@/contexts/theme/ThemeContextProvider";
import type { Metadata } from "next";
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
        <InitColorSchemeScript defaultMode="system" />
        <ThemeContextProvider>
          <TanstackQueryProvider>
            <div className="grid grid-cols-[auto_1fr] overflow-hidden">
              <NavBar />
              <main className="h-dvh overflow-auto p-10">{children}</main>
            </div>
          </TanstackQueryProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
