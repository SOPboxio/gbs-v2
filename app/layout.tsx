import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Go Be Strong - Michael Pinkowski",
  description: "Personal projects and incubating SaaS businesses by Michael Pinkowski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-white border-b-4 border-black">
          <div className="max-w-6xl mx-auto px-6 py-2">
            <div className="flex justify-between items-center">
              <Link href="/" className="block">
                <Image
                  src="/gbs-logo.png"
                  alt="Go Be Strong Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <div className="flex gap-6">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/projects" className="hover:underline">Projects</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
