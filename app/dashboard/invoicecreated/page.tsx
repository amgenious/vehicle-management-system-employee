import GetallInvoices from '@/components/dashboard/invoicescreated/getallinvoices'
import React from 'react'

const InvoicedCreated = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
    <div className='w-full p-3 h-fit bg-white'><p className='text-primary text-3xl font-black'>Invoice</p>
    <p className='italic text-xs'>All Invoices Created</p>
    </div>
    <div className='p-3 h-full flex flex-col gap-5'>
    <GetallInvoices />
    </div>
   </div>
  )
}

export default InvoicedCreated