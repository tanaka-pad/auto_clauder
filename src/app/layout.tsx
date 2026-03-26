import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "国内スマートフォン スペック一覧",
  description: "国内販売スマートフォンのスペックを絞り込み・比較できます",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
