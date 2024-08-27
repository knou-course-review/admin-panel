import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import TanstackQueryProvider from "@/contexts/tanstack/TanstackQueryProvider";
import ThemeContextProvider from "@/contexts/theme/ThemeContextProvider";
import { noto_sans_kr } from "@/constants/next-font";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KNOUK admin panel",
  description: "KNOUK 관리자페이지 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={noto_sans_kr.className}>
        <InitColorSchemeScript defaultMode="system" />
        <ThemeContextProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
