import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nativecn-ui - Premium React Native Components",
  description: "Copy-paste React Native UI components. Production-ready, TypeScript-first. No package bloat, just beautiful code.",
  keywords: ["React Native", "Components", "UI Library", "TypeScript", "Mobile Development"],
  authors: [{ name: "nativecn-ui" }],
  openGraph: {
    title: "nativecn-ui - Premium React Native Components",
    description: "Copy-paste React Native UI components. Production-ready, TypeScript-first.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
