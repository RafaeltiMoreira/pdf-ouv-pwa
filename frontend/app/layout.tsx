import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CidadaoProvider } from "@/components/providers/cidadao-provider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ouvidoria Digital - Participa DF",
  description: "Sistema de ouvidoria digital para registro e acompanhamento de manifestações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <CidadaoProvider>
            {children}
            <Toaster position="top-center" richColors />
          </CidadaoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
