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
  title: "Employee Vehicle Management System",
  description: "Vehicle Management System managed by employees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  //   <html lang="en">
  //   <body className={poppins.className}>
  //     {children}
  //     </body>
  // </html>

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
