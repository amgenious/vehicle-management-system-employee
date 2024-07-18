import GetallCostSharing from '@/components/dashboard/costsharing/getallcostsharing'
import React from 'react'

const CostSharing = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
     <div className='w-full p-3 h-fit bg-white'><p className='text-primary text-3xl font-black'>Cost Sharing</p>
     <p className='italic text-xs'>All Cost Sharing Created</p>
     </div>
     <div className='p-3 h-full flex flex-col gap-5'>
     <GetallCostSharing />
     </div>
    </div>
  )
}

export default CostSharing