'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SignOutButton } from "@clerk/nextjs";
import {
    Car,
    ClipboardPenLine,
    Home,
    LogOut,
    Menu,
    Package,
    Pen,
  } from "lucide-react";
  import Link from "next/link";
import Image from 'next/image';
import { logo } from '@/public/images';

const NavBar= () => {
    const pathname = usePathname();
  return (
    <header className=" flex h-14 items-center gap-4 border-b bg-primary px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-black">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard",
                }
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/getallpendingbookings"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard/getallpendingbookings",
                }
              )}
            >
              <Pen className="h-4 w-4" />
              Get All Pending Bookings
            </Link>
            <Link
              href="/dashboard/customerservicereport"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard/customerservicereport",
                }
              )}
            >
              <Package className="h-4 w-4" />
              Customer Service Report
            </Link>
            <Link
              href="/dashboard/invoicecreated"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard/invoicecreated",
                }
              )}
            >
              <ClipboardPenLine className="h-4 w-4" />
              Invoices Created
            </Link>
            <Link
              href="/dashboard/costsharing"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard/costsharing",
                }
              )}
            >
              <ClipboardPenLine className="h-4 w-4" />
              Cost Sharing Created
            </Link>
            <Link
              href="/dashboard/trackservicedcars"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard/trackservicedcars",
                }
              )}
            >
              
              <Car className="h-4 w-4" />
              Track Serviced Cars
            </Link>
          </nav>
          <div className="mt-auto">
          <SignOutButton>
            <Button>
                <LogOut />
                <p className='ml-3'>
                Logout
                </p>
            </Button>
           </SignOutButton>
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex gap-2 justify-center items-center'>
        <Image src={logo} alt='logo'
        className='w-12 h-12'
        />
        <p className='text-center font-bold text-xl text-black'>AVIC-CCTU MANAGEMENT SYSTEM - Employee Section</p>
      </div>
      
    </header>
  )
}

export default NavBar
