import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import { MathJaxProvider } from "@/components/mathjax-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hologram - Geometric computation",
  description:
    "A shared language for universal data. Building open source, community-led infrastructure.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen gradient-background`}
      >
        {/* Grid background pattern */}
        <div className="pointer-events-none fixed inset-0 z-0 grid-pattern" />
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <Navigation />
            <main className="relative z-10 min-h-screen">{children}</main>
            <footer className="relative z-10 border-t border-border/10 bg-transparent">
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <p className="text-xs leading-5 text-muted-foreground text-center">
                  © 2026 Hologram Technologies. All rights reserved.
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
