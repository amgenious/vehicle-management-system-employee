
import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import { User } from 'lucide-react';

const UserProfile = async() => {
  const user = await currentUser();
  return (
    <div className='flex gap-5 w-full p-2'>
    <div className='bg-primary rounded-full w-16 h-16 flex justify-center items-center'><User className='text-white w-10 h-10' /></div>
    <div className='flex flex-col justify-center '>
        <p className='font-semibold text-white'>{user?.fullName}</p>
        <p className='text-sm text-primary'>Employee</p>
    </div>
</div>
  )
}

export default UserProfile