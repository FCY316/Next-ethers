"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { SnackbarProvider } from 'notistack';
import Header from "./header";
import Foot from "./foot";
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
          <Header />
          {children}
          <Foot />
        </SnackbarProvider>
      </body>
    </html>
  );
}
