import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          position="top-right" // 오른쪽 상단에 표시
          autoClose={2000} // 3초 후 자동으로 닫힘
          hideProgressBar={false} // 게이지 바 표시
          newestOnTop={true} // 최신 알림이 위로
          closeOnClick // 클릭 시 닫힘
          rtl={false} // 텍스트 방향: 왼쪽 → 오른쪽
          pauseOnFocusLoss // 포커스 잃으면 일시 정지
          draggable // 드래그 가능
          pauseOnHover // 마우스 오버 시 일시 정지
          theme="light" // 기본 테마
        />
        {children}
      </body>
    </html>
  );
}
