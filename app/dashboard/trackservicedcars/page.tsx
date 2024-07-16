import GetallTrackedCars from '@/components/dashboard/trackservicedcars/getalltrackedcars'
import React from 'react'

const TrackServicedCars = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
    <div className='w-full p-3 h-fit bg-white'><p className='text-primary text-3xl font-black'>Service Tracker</p>
    <p className='italic text-xs'>Tracking all service cars by you</p>
    </div>
    <div className='p-3 h-full flex flex-col gap-5'>
    <GetallTrackedCars />
    </div>
   </div>
  )
}

export default TrackServicedCars