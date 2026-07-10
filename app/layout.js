import { Inter } from "next/font/google";
import { BRAND } from "../lib/theme";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE = "Ebbli — Learn AI, Find Work, Build a Business & More · Built for Africa"
const DESCRIPTION = "Ebbli is Africa's AI platform for opportunity. Learn new skills, find a job, grow your business, find a partner, improve your farm, and more — all in one place. Free to start."

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
