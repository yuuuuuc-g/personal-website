import type { Metadata } from "next";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Garden",
  description: "一个记录中国、AI、世界与日常生活的个人数字花园。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
