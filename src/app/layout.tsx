import "@/styles/globals.css";

import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "@/trpc/react";
import { bebasNeue, anton, roboto } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${anton.variable} ${roboto.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="selection:bg-primary/50 selection:text-primary-foreground">
        <TRPCReactProvider>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
            </ThemeProvider>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}