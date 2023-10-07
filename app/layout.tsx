import EditorProvider from "@/context/editor-context";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Crafter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <EditorProvider>
        <body className={inter.className}>{children}</body>
      </EditorProvider>
    </html>
  );
}
