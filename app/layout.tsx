"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { SnackbarProvider } from 'notistack';
import Header from "./Layout/header";
import Foot from "./Layout/foot";
import RouteGuard from "./routeGuard";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 提示 */}
        <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: 'right' }}  >
          {/* 头部 */}
          <Header />
          {/* 路由守卫 */}
          {RouteGuard(children)}
          {/* 底部 */}
          <Foot />
        </SnackbarProvider>
      </body>
    </html>
  );
}
