import React from 'react'
import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import Link from 'next/link'

const GetallInvoices = () => {
  return (
    <div className='p-3'>
    <p className='text-xl font-medium'>A list of all Invoices Created.</p>
  {/* <Table>
<TableHeader>
  <TableRow>
    <TableHead>Job Number</TableHead>
    <TableHead>Client Name</TableHead>
    <TableHead>Phone Number</TableHead>
    <TableHead>Vehicle Registration Number</TableHead>
    <TableHead>Faulty Description</TableHead>
    <TableHead>Net Total</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  <Link href="invoicecreated/1">
  <TableRow>
    <TableCell className="font-medium">INV001</TableCell>
    <TableCell>Processing</TableCell>
    <TableCell>dkf</TableCell>
    <TableCell>kvls</TableCell>
    <TableCell>vs,l</TableCell>
    <TableCell>fdv</TableCell>
  </TableRow>
  </Link>
</TableBody>
</Table> */}
  </div>
  )
}

export default GetallInvoices