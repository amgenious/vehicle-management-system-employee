'use client'
import { car } from '@/public/images'
import Image from 'next/image'
import React,{useState,useEffect} from 'react'
import { db } from '@/lib/firebaseConfig'
import {
    getDoc
    ,doc
} from "firebase/firestore";
import { Loader } from 'lucide-react'
import { useUser } from '@clerk/clerk-react';

import CreateServiceReport from '@/components/dashboard/customerservicereport/createservicereport'

const ClientBookingsDetails = ({params}:any) => {
  const [data, setData] = useState<DocumentData>({});
  const [loading, setLoading] = useState(true);
  const ids = params.id
  const {user}=useUser()

    interface DocumentData{
        name?: any;
        status?: string;
        phonenumber?: any;
        carnumber?: any;
        [key: string]: any;
    }
    useEffect(() => {
      const fetchData = async () => {
        await GetBookingById();
      };
      fetchData();
        
    }, []);
    const GetBookingById = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "bookings",ids);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData({id:docSnap.id, ...docSnap.data()});
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
        setLoading(false);
      };

  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
    <div className='w-full p-3 h-fit bg-white'>
        <p className='text-primary text-3xl font-black'>Client Details</p>
        <p className='font-medium text-xs italic'>Details about the client and the booking for servicing</p>
    </div>
    <div className='p-3 h-fit flex flex-col gap-5'>
        <div>
         <CreateServiceReport 
            name={data.name}
            phonenumber={data.phonenumber}
            carnumber={data.carnumber}
            model={data.model}
            fault={data.faultdescription}
            reportingtime={data.reportingtime}
            id={ids}
            jobnumber={data.Job_number} 
            employeeEmail={user?.primaryEmailAddress?.emailAddress}         />
        </div>
    {
        loading ? (
            <Loader size={40} className="animate-spin ml-2 text-primary text-center" />
        ):(

     <div className='h-full flex gap-5'>
        <div className='w-[50%] flex flex-col items-center p-5 bg-white rounded-md'>
            <div className='w-32 h-32 bg-primary rounded-full mb-3'></div>
            <div className='border border-primary w- w-full'>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Full Name: {data?.name} </p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Phone Number: {data?.phonenumber}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Email: {data?.email}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Reporting Time: {data?.reportingtime}</p>
            <p className='font-semibold text-black mb-2 p-1'>Job Number: {data?.Job_number} </p>
            </div>
        </div>
        <div className='w-[50%] flex flex-col items-center p-5 bg-white rounded-md'>
            <Image src={car} alt='car' className='w-32 h-32 mb-3' priority/>
            <div className='border border-primary w- w-full'>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Manufacturer: {data?.manufacturer}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Model {data?.model}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Vehicle Registration Number: {data?.carnumber}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Mileage: {data?.mileage}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary uppercase'>Chassis Number: {data?.chassisnumber}</p>
            <p className='font-semibold text-black mb-2 p-1'>Fault Description: {data?.faultdescription}</p>
            </div>
        </div>
     </div>
        )
    }
    </div>
   </div>
  )
}

export default ClientBookingsDetails