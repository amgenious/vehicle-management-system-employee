import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import UserProfile from '../sidebar/userprofile'
import SideBarLinks from '../sidebar/sidebarlinks'

const SideBar = () => {
  return (
    <div className='hidden border-r md:block bg-black'>
    <div className="flex h-full max-h-screen flex-col justify-between">
       <UserProfile />
       <SideBarLinks />
       <div className='w-[100%] py-5 flex justify-center'>
       <Button>
           <LogOut />
           <p className='ml-3'>
           Logout
           </p>
       </Button>
       </div>
    </div>
</div>
  )
}

export default SideBar