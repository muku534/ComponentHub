import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { StudioProvider } from "@/lib/studio/context";

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
  icons: {
    icon: "/logo-v1.png",
    shortcut: "/logo-v1.png",
    apple: "/logo-v1.png",
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
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <StudioProvider>
            <AnalyticsProvider />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </StudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
