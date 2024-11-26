import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import React, { Suspense } from "react";
import Loading from "@/components/Loading";
export const metadata: Metadata = {
  title: "Roadassothai",
  description: "สมาคมทางหลวงแห่งประเทศไทย",
  icons: {
    icon: "/LOGO-FINAL.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <AuthProvider>
          <Navbar>
            <Suspense fallback={<Loading />}>
              <main className="relative overflow-hidden">{children}</main>
            </Suspense>
          </Navbar>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
