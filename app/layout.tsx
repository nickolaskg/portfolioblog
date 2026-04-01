import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nickolas | Software Engineer & Creative Developer",
    template: "%s | Nickolas",
  },
  description:
    "Portfolio and blog of Nickolas — software engineer crafting high-performance web experiences, mobile apps, and open-source tools.",
  keywords: ["software engineer", "developer", "portfolio", "blog", "nextjs", "react", "typescript"],
  authors: [{ name: "Nickolas" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nickolas Portfolio",
    title: "Nickolas | Software Engineer & Creative Developer",
    description:
      "Portfolio and blog of Nickolas — software engineer crafting high-performance web experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nickolas | Software Engineer & Creative Developer",
    description: "Portfolio and blog of Nickolas — software engineer crafting high-performance web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
