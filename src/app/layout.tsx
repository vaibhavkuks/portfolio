import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavRail from "./(components)/navrail";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaibhav Kukreti",
  description: "My portfolio website showcasing my work and blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${geistMono.variable} antialiased`}>
        {/* <div className="flex flex-row min-h-screen">
          <NavRail />
          <div className="w-full min-h-screen">{children}</div>
        </div> */}
        <div>{children}</div>
      </body>
    </html>
  );
}
