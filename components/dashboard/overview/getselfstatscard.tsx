'use client'
import React,{useState,useEffect} from 'react'
import { Card, CardHeader, CardTitle} from '@/components/ui/card'
import { AudioWaveform, ClipboardPenLine, MonitorCheck, Package } from 'lucide-react'
import {auth,db} from "@/lib/firebaseConfig"
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useUser } from '@clerk/clerk-react';
const GetSelfStatsCard = () => {
  const {user}=useUser()
  const colRef1 = collection(db, "customerservicereport");
  const colRef2 = collection(db, "servicetracker");
  const colRef3 = collection(db, "invoice");
  const colRef4 = collection(db, "costsharing");
  const [invoices, setInvoices] = useState([]);
  const [customerservicereports, setCustomerServiceReports] = useState([]);
  const [servicetrackers, setServiceTrackers] = useState([]);
  const [costsharing, setCostSharing] = useState([]);
  let me:any
  useEffect(()=>{
    try{
      const q1 = query(
        colRef1,
        where("EmployeeEmail","==",me)
      );
      const q2 = query(
        colRef2,
        where("employeeEmail","==",me)
      );
      const q3 = query(
        colRef3,
        where("EmployeeEmail","==",me)
      );
      const q4 = query(
        colRef4,
        where("employeeEmail","==",me)
      );
      const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
        let list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCustomerServiceReports(list.length);
        
      });
      const unsubscribeSnapshot1 = onSnapshot(q2, (snapShot) => {
        let list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setServiceTrackers(list.length);
      });
      const unsubscribeSnapshot2 = onSnapshot(q3, (snapShot) => {
        let list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setInvoices(list.length);
      });
      const unsubscribeSnapshot3 = onSnapshot(q4, (snapShot) => {
        let list:any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCostSharing(list.length);
      });
      return () => {
        unsubscribeSnapshot();
        unsubscribeSnapshot1();
        unsubscribeSnapshot2();
        unsubscribeSnapshot3();
      };
    }catch(errors){
      console.log(errors)
    }
  },[me =user?.primaryEmailAddress?.emailAddress])
  return (
    <div className="grid gap-5 md:grid-cols-4 grid-cols-1 w-full h-fit text-center">
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium"> Bookings Cleared</CardTitle>
        <div className="text-2xl font-bold text-left">{customerservicereports}</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-orange-400 rounded-md'>
    <Package className="h-7 w-7 text-white" />
    </div>
        </div>
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Serviced Cars</CardTitle>
        <div className="text-2xl font-bold text-left">{servicetrackers}</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-green-400 rounded-md'>
    <AudioWaveform className="h-7 w-7 text-white" />
    </div>
        </div>
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium"> Invoices Created</CardTitle>
        <div className="text-2xl font-bold text-left">{invoices}</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-orange-400 rounded-md'>
    <ClipboardPenLine className="h-7 w-7 text-white" />
    </div>
        </div>
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium"> Cost Sharing Created</CardTitle>
        <div className="text-2xl font-bold text-left">{costsharing}</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-purple-400 rounded-md'>
    <MonitorCheck className="h-7 w-7 text-white" />
    </div>
        </div>
    </div>
  )
}

export default GetSelfStatsCard