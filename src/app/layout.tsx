import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Inkingi System",
  description: "Student Education Software",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Header />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
