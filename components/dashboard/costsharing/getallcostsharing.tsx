"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { useUser } from '@clerk/clerk-react';
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { Loader } from "lucide-react";

const GetallCostSharing = () => {
    const {user}=useUser()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const colRef = collection(db, "costsharing");
    let me:any
    useEffect(() => {
        const fetchData = async () => {
        await getItems()
        }
        fetchData();
    }, [
      me =user?.primaryEmailAddress?.emailAddress
    ]);
    const getItems = async()=>{
      try {
        const q1 = query(
            colRef,
            where("employeeEmail","==",me),
            orderBy("timeStamps","desc")
            
        );
        const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
            setLoading(true);
            setData([]);
            let list:any= [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            console.log(list)
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
    }
  return (
    <div className='p-3'>
    <p className='text-xl font-medium'>A list of all Cost Sharing Created.</p>
  <Table>
<TableHeader>
  <TableRow>
    <TableHead>Client Name</TableHead>
    <TableHead>Date</TableHead>
    <TableHead>Job Number</TableHead>
    <TableHead>Vehicle Registration Number</TableHead>
    <TableHead>Labour</TableHead>
    <TableHead className="text-center">Item Used</TableHead>
    <TableHead>Quantity</TableHead>
    <TableHead>Rikpat(Distribution Price)</TableHead>
    <TableHead>Other Services</TableHead>
    <TableHead>Retail Price</TableHead>
    <TableHead>Discount</TableHead>
    <TableHead>Total Bill</TableHead>
    <TableHead>CCTU</TableHead>
    <TableHead>Mr. Benedict Blater</TableHead>
    <TableHead>Employee Email</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
{data?.length > 0 && loading == false ? (
            data.map((item: any) => (
              <TableRow key={item.id} className="">
              <TableCell>{item.client}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.Job_number}</TableCell>
              <TableCell>{item.vehicle_registration_number}</TableCell>
              <TableCell>{item.Labour}</TableCell>
              <TableCell className="w-40">
              <ul>
              {item.remarks.map((remark: { id: React.Key | null | undefined; parts_used: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <li className='border-b text-center p-1' key={remark.id}>
                    {remark.parts_used}
                  </li>
                ))}
                </ul>
              </TableCell>
              <TableCell>
              <ul>
              {item.remarks.map((remark: { id: React.Key | null | undefined; quantity: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <li className='border-b text-center p-1' key={remark.id}>
                    {remark.quantity}
                  </li>
                ))}
                </ul>
              </TableCell>
              <TableCell>
                <ul>
              {item.rikpat.map((remark: { id: React.Key | null | undefined; value: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <li className='border-b text-center p-1' key={remark.id}>
                    {remark.value}
                  </li>
                ))}
                </ul>
              </TableCell>
              <TableCell>{item.otherservices}</TableCell>
              <TableCell>
               <ul>
              {item.remarks.map((remark: { id: React.Key | null | undefined; unit_price: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                <li className='border-b text-center p-1' key={remark.id}>
                    {remark.unit_price}
                  </li>
                ))}
                </ul>
              </TableCell>
              <TableCell>{item.discount}</TableCell>
              <TableCell>{item.totalbill}</TableCell>
              <TableCell>{item.CCTU}</TableCell>
              <TableCell>{item.Mr_Benedict_Blater}</TableCell>
              <TableCell>{item.employeeEmail}</TableCell>
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

export default GetallCostSharing