import "./globals.css";
import { ThemeProvider } from "../utils/theme-provider";
import "@fortawesome/fontawesome-svg-core/styles.css";

/*import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/
//className={`${/*geistSans.variable*/} ${geistMono.variable} antialiased`}

//Dynamic page load: Login / Homepage;
export default function RootLayout({ children, modals }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnchange
        >
          <div className="relative min-h-screen">{children}</div>
          <div>{modals}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
