import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from '@/components/Sidebar'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Dealcar Mini – Gestión moderna de vehículos",
  description:
    "Dealcar Mini  es una plataforma rápida y visual para listar, editar y gestionar vehículos. Hecha con Next.js, Tailwind y TypeScript.",
  keywords: [
    "CRUD coches",
    "gestión de vehículos",
    "Next.js",
    "plataforma coches",
    "frontend moderno",
    "tailwind",
    "typescript",
    "vehículos",
    "react",
  ]};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="style"
        />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
