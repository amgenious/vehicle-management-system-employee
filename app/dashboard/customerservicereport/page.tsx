import GetAllServiceReports from '@/components/dashboard/customerservicereport/getallservicereport'
import React from 'react'

const CustomerServiceReport = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
     <div className='w-full p-3 h-fit bg-white'><p className='text-primary text-3xl font-black'>Customer Service Report</p>
     <p className='italic text-xs'>All Customer Service Reports Created</p>
     </div>
     <div className='p-3 h-full flex flex-col gap-5'>
     <GetAllServiceReports />
     </div>
    </div>
  )
}

export default CustomerServiceReport