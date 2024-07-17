'use client'
import React,{useState,useEffect} from 'react'
import { db } from '@/lib/firebaseConfig'
import {
    getDoc
} from "firebase/firestore";
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { addDoc, collection, serverTimestamp,doc, updateDoc} from "firebase/firestore";
import Invoiceforms from '@/components/dashboard/createinvoice/invoiceforms';

const ServiceReportDetails = ({params}:any) => {
    const ids = params.id
    interface DocumentData{
      name?: string;
      status?: string;
      phonenumber?: string;
      carnumber?: string;
      [key: string]: any;
  }
  const [data, setData] = useState<DocumentData>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    GetBookingById()
}, []);
const GetBookingById = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "customerservicereport",ids);
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
  const CreateServiceTracker = async()=>{
    type Timestamp = {
      seconds: number;
      nanoseconds: number;
    };
    function addDaysToTimestamp(timestamp: Timestamp, days: number): string {
      const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      date.setDate(date.getDate() + days);
      return date.toUTCString();
    }
    const newDateString = addDaysToTimestamp(data?.timeStamps, 30);
   
    try{
      await addDoc(collection(db,"servicetracker"),{
      Job_number:data?.Job_number,
      Client_name:data?.name,
      Phone_number:data?.phonenumber,
      Service_date:data?.timeStamps,
      employeeEmail:data?.EmployeeEmail,
      Next_Service_date:newDateString,
      timeStamps: serverTimestamp(), 
      })
      alert("Service Tracker Created")
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
    <div className='w-full p-3 h-fit bg-white'>
        <p className='text-primary text-3xl font-black'>Details of the Service Report</p>
    </div>
    <div className='p-3 h-fit flex flex-col gap-5'>
      <div className='w-full flex justify-between'>
        <Button onClick={CreateServiceTracker}>Generate its Service Tracker</Button>
       <Invoiceforms 
       ide={ids} 
       employeeEmail={data?.EmployeeEmail}       
       />
      </div>
    {
        loading ? (
            <Loader size={40} className="animate-spin ml-2 text-primary text-center" />
        ):(

     <div className='h-full flex gap-5'>
        <div className='w-[100%] flex flex-col items-center p-5 bg-white rounded-md'>
            <div className='border border-primary w- w-full'>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'> Job Number: {data?.Job_number} </p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Vehicle Registration Number: {data?.carnumber}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Model: {data?.model}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Client Phone Number: {data?.phonenumber}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Client Name: {data?.name}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Reported Time: {data?.reportingtime}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Employee Email: {data?.EmployeeEmail}</p>
            <p className='font-semibold text-black mb-2 p-2 border-b border-primary'>Fault: {data?.faultdescription} </p>
            <p className='font-semibold text-black mb-2 p-2 '>Employee Servicing Report: {data?.remarks} </p>
            </div>
        </div>
     </div>
        )
    }
    </div>
   </div>
  )
}

export default ServiceReportDetails