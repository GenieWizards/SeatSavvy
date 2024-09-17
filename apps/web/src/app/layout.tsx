import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/features/nav/components/header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SeatSavvy - Book your next ticket",
  description: "A seat booking application for the next generation of theatre",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "grid place-items-center grid-rows-[auto_1fr_auto] min-h-dvh",
          inter.className,
        )}
      >
        <Header />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
