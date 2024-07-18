import CreateBooking from '@/components/dashboard/getallpendingbookings/createbooking'
import GetallBookings from '@/components/dashboard/getallpendingbookings/getallbookings'
import React from 'react'

const PendingBookings = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
     <div className='w-full flex justify-between p-3 h-fit bg-white'><p className='text-primary text-3xl font-black'>Pending Bookings</p>
     <CreateBooking />
     </div>
     <div className='p-3 h-full flex flex-col gap-5'>
     <GetallBookings />
     </div>
    </div>
  )
}

export default PendingBookings