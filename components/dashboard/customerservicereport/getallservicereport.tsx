'use client'
import React,{useState,useEffect} from 'react'
import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import Link from 'next/link'
import { db } from "@/lib/firebaseConfig";
import {
    collection,
    query,
    onSnapshot,
    where,
} from "firebase/firestore";
import { Loader } from 'lucide-react';
// import { currentUser } from '@clerk/nextjs/server';

const GetAllServiceReports = () => {
  // const user = await currentUser();
  // const useremail = user?.primaryEmailAddress?.emailAddress
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "customerservicereport");
  useEffect(() => {
    try {
        const q1 = query(
            colRef,
            where("email","==","henrytweneboah956@gmail.com"),
        );
        const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
            setLoading(true);
            setData([]);
            let list:any= [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
            setLoading(false);
        });
        return () => {
            unsubscribeSnapshot();
        };

    } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
    }
}, []);
  return (
    <div className='p-3'>
    <p className='text-xl font-medium'>A list of all Services Reports.</p>
  <Table>
<TableHeader>
  <TableRow>
    <TableHead>Job Number</TableHead>
    <TableHead>Client Name</TableHead>
    <TableHead>Phone Number</TableHead>
    <TableHead>Vehicle Registration Number</TableHead>
    <TableHead>Faulty Description</TableHead>
    <TableHead>Servicing Required</TableHead>
    <TableHead className='text-center'>More Details</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
{data?.length > 0 && loading == false ? (
            data.map((item: any) => (
              <TableRow key={item.id} className="">
              <TableCell className="font-medium">
                {item.Job_number}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.phonenumber}</TableCell>
              <TableCell>{item.carnumber}</TableCell>
              <TableCell>{item.faultdescription}</TableCell>
              <TableCell>{item.remarks}</TableCell>
              <TableCell className="bg-primary text-white text-center font-bold">
                <Link href={`customerservicereport/${item.id}`}>
                  Details
                </Link>
              </TableCell>
            </TableRow>))
) : loading ? (
  <Loader
    size={40}
    className="animate-spin ml-2 text-primary text-center"
  />
) : (
  <p>No Data Available</p>
)
}
</TableBody>
</Table>
  </div>
  )
}

export default GetAllServiceReports