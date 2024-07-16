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
import CreateServiceReport from '@/components/dashboard/customerservicereport/createservicereport'

const ClientBookingsDetails = ({params}:any) => {
    interface DocumentData{
        name?: string;
        status?: string;
        phonenumber?: string;
        carnumber?: string;
        [key: string]: any;
    }
    const [data, setData] = useState<DocumentData>({});
    const [loading, setLoading] = useState(true);
    const ids = params.id
    useEffect(() => {
        GetBookingById()
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
         <CreateServiceReport name={data?.data.name} phonenumber={data?.data.phonenumber} carnumber={data?.data.carnumber} model={data?.data.model} 
         fault={data?.data.faultdescription} reportingtime={data?.data.reportingtime} id={ids} jobnumber={data?.data.Job_number}       
         />
        </div>
    {
        loading ? (
            <Loader size={40} className="animate-spin ml-2 text-primary text-center" />
        ):(

     <div className='h-full flex gap-5'>
        <div className='w-[50%] flex flex-col items-center p-5 bg-white rounded-md'>
            <div className='w-32 h-32 bg-primary rounded-full mb-3'></div>
            <div className='border border-primary w- w-full'>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Full Name: {data?.data.name} </p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Phone Number: {data?.data.phonenumber}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Reporting Time: {data?.data.reportingtime}</p>
            <p className='font-semibold text-black mb-2 p-1'>Job Number: {data?.data.Job_number} </p>
            </div>
        </div>
        <div className='w-[50%] flex flex-col items-center p-5 bg-white rounded-md'>
            <Image src={car} alt='car' className='w-32 h-32 mb-3' priority/>
            <div className='border border-primary w- w-full'>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Manufacturer: {data?.data.manufacturer}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Model {data?.data.model}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Vehicle Registration Number: {data?.data.carnumber}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Mileage: {data?.data.mileage}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary uppercase'>Chassis Number: {data?.data.chassisnumber}</p>
            <p className='font-semibold text-black mb-2 p-1'>Fault Description: {data?.data.faultdescription}</p>
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