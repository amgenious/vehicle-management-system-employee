import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "EMPLOYEE-AVIC-CCTU MANAGEMENT SYSTEM",
  description: "AVIC-CCTU management system managed by employees",
  icons:{
    icon:'CCTU_logo.png'
 }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}>
        <SignedOut>
          <div className="flex h-screen justify-center items-center">
            <SignIn routing="hash" />
          </div>
        </SignedOut>
        <SignedIn>
        {children}
        </SignedIn>
        </body>
    </html>
    </ClerkProvider>
  );
}
