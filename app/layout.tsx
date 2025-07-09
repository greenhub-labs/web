import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenHub Labs",
  description: "Smart IoT system for garden and greenhouse management",
};

/**
 * Root layout required when having a root not-found.tsx page
 * This layout passes children through and is minimal since
 * most functionality is handled in [lang]/layout.tsx
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
