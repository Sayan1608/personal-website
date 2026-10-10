import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sayan Sengupta | Java Developer",
  description:
    "Sayan Sengupta is a Java developer in Bengaluru, India, with experience in Java, Spring Boot, Hibernate, RESTful web services, and microservices.",
  applicationName: "Sayan Sengupta Portfolio",
  openGraph: {
    title: "Sayan Sengupta | Java Developer",
    description:
      "Java developer building scalable backend systems with Java, Spring Boot, Hibernate, and microservices.",
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary",
    title: "Sayan Sengupta | Java Developer",
    description:
      "Java developer building scalable backend systems with Java, Spring Boot, Hibernate, and microservices."
  }
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#111410" }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
