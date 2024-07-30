import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./globalicons.css";
import { AppProvider } from "./_context/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodePocket",
  description: "Store and share code snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
      <body className={inter.className}>{children}</body>
      </AppProvider>
    </html>
  );
}
