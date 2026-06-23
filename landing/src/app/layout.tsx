import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just Type",
  description: "Start typing anywhere — JustType finds the right input and routes your text. No clicking. No missed shortcuts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
