import GetAllPendingBookings from '@/components/dashboard/overview/getallpendingbookings'
import GetSelfStatsCard from '@/components/dashboard/overview/getselfstatscard'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
     <div className='w-full p-3 h-fit bg-white'><p className='text-primary text-3xl font-black'>Dashboard</p></div>
     <div className='p-3 h-full flex flex-col gap-5'>
      <GetAllPendingBookings />
      <GetSelfStatsCard />
     </div>
    </div>
  )
}

export default DashboardPage