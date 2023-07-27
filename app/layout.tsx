import "./globals.css";
import { Inter } from "next/font/google";

import Header from "@/components/header";
import AuthContext from "@/app/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tempo Control",
  description: "Collection of tools to help you improve your tempo control.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-background-dark" lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Header />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
