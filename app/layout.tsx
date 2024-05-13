"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { SnackbarProvider } from 'notistack';
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider maxSnack={3} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: 'right' }}  >
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}
