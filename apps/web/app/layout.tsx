import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Society of Catholic Scientists",
  description:
    "A community of Catholic scientists dedicated to advancing science in harmony with faith.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
