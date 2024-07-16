"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    Home,
    Package,
    ClipboardPenLine,
    Car,
    Pen
  } from "lucide-react"

const SideBarLinks = () => {
    const pathname = usePathname();
  return (
    <div className="flex-1 pt-5">
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        href="/dashboard"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
        {
          'bg-primary text-white text-muted': pathname === "/dashboard",
        },
        ) 
        }
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/dashboard/getallpendingbookings"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
        {
          'bg-primary text-white text-muted': pathname === "/dashboard/getallpendingbookings",
        },
        ) 
        }
      >
        <Pen className="h-4 w-4" />
        Get All Pending Bookings
      </Link>
      <Link
        href="/dashboard/customerservicereport"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
        {
          'bg-primary text-white text-muted': pathname === "/dashboard/customerservicereport",
        },
        ) 
        }
      >
        <Package className="h-4 w-4" />
        Customer Service Report
      </Link>
      <Link
        href="/dashboard/invoicecreated"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
        {
          'bg-primary text-white text-muted': pathname === "/dashboard/invoicecreated",
        },
        ) 
        }
      >
        <ClipboardPenLine className="h-4 w-4" />
        Invoices Created
      </Link>
      <Link
        href="/dashboard/trackservicedcars"
        className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
        {
          'bg-primary text-white text-muted': pathname === "/dashboard/trackservicedcars",
        },
        ) 
        }
      >
        <Car className="h-4 w-4" />
        Track Serviced Cars
      </Link>
    </nav>
  </div>
  )
}

export default SideBarLinks