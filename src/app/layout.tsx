"use client";

import "./globals.css";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider, ToasterTopRight } from "portfolioui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
          disableTransitionOnChange
        >
          <AuthProvider
            accessKeyFromProject={
              process.env.NEXT_PUBLIC_PORTFOLIO_ACCESS_KEY ?? ""
            }
          >
            <main>{children}</main>
            <ToasterTopRight />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
