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
  orderBy,
} from "firebase/firestore";
import { Loader } from "lucide-react";
import { useUser } from '@clerk/clerk-react';

const GetallInvoices = () => {
  const {user}=useUser()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "invoice");
  let me:any
  useEffect(() => {
    try {
      const q1 = query(colRef, where("EmployeeEmail","==",me),orderBy("timeStamps","desc"));
      const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
        setLoading(true);
        setData([]);
        let list: any = [];
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
      console.error("Error fetching data:", error);
    }
  }, [me =user?.primaryEmailAddress?.emailAddress]);
  return (
    <div className='p-3'>
    <p className='text-xl font-medium'>A list of all Invoices Created.</p>
  <Table>
<TableHeader>
  <TableRow>
    <TableHead>Job Number</TableHead>
    <TableHead>Client Name</TableHead>
    <TableHead>Vehicle Registration Number</TableHead>
    <TableHead>Faulty Description</TableHead>
    <TableHead>Remarks</TableHead>
    <TableHead>Net Total</TableHead>
    <TableHead>More Details</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
{data?.length > 0 && loading == false ? (
            data.map((item: any) => (
              <TableRow key={item.id} className="">
                <TableCell className="font-medium">
                  {item.Job_number}
                </TableCell>
                <TableCell>{item.Client_name}</TableCell>
                <TableCell>{item.Vehicle_Registration_Number}</TableCell>
                <TableCell>{item.fault}</TableCell>
                <TableCell>
                <ul>
                {item.Employeeremarks.map((remark: { id: React.Key | null | undefined; value: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                  <li key={remark.id}>{remark.value}</li>
                ))}
              </ul>
                </TableCell>
                <TableCell>{item.Net_Price}</TableCell>
                <TableCell className="bg-primary text-white text-center font-bold">
                  <Link href={`invoicecreated/${item.id}`}>
                    Details
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : loading ? (
            <Loader
              size={40}
              className="animate-spin ml-2 text-primary text-center"
            />
          ) : (
            <p>No Data Available</p>
          )}
</TableBody>
</Table>
  </div>
  )
}

export default GetallInvoices