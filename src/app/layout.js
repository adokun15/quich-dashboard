import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/utils/theme-provider";
import Link from "next/link";
import Popover from "@/components/popover";
import Image from "next/image";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard | QuichShop",
  description: "Manage your store for your customers.",
};

//Dynamic page load: Login / Homepage;
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnchange
        >
          <div className="relative ">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
