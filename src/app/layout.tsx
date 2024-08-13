import { Noto_Sans_KR } from "next/font/google";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import NavBar from "@/components/NavBar";
import TanstackQueryProvider from "@/contexts/tanstack/TanstackQueryProvider";
import ThemeContextProvider from "@/contexts/theme/ThemeContextProvider";
import type { Metadata } from "next";
import "./globals.css";

const noto_sans_kr = Noto_Sans_KR({ subsets: ["latin"] });

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
      <body className={noto_sans_kr.className}>
        <InitColorSchemeScript defaultMode="system" />
        <ThemeContextProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
