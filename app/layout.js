import { Bricolage_Grotesque, Inter } from "next/font/google";
import { BRAND } from "../lib/theme";
import "../styles/globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Ebbli",
  description: BRAND.mission,
  openGraph: {
    title: "Ebbli",
    description: BRAND.mission,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
