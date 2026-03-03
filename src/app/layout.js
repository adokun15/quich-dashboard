import "./globals.css";
import { Geist, Geist_Mono, Open_Sans, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/utils/theme-provider";
import "@fortawesome/fontawesome-svg-core/styles.css";

const OpenSans = Geist({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const RobotoMono = Geist_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard | QuichShop",
  description: "Manage your store for your customers.",
};

//Dynamic page load: Login / Homepage;
export default function RootLayout({ children, modals }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${OpenSans.variable} ${RobotoMono.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnchange
        >
          <div className="relative bg-primary900 min-h-screen">{children}</div>
          <div>{modals}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
