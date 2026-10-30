import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "CareBuddy | Your Modern Personal Health & Wellness Companion",
  description:
    "Empathetic health tracking, medication reminders, daily wellness scores, and AI-assisted health guidance.",
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('carebuddy_theme');
    var isDark = stored ? stored === 'dark' : true;
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="h-full bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-sky-100 selection:text-sky-900 dark:selection:bg-sky-900 dark:selection:text-sky-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
