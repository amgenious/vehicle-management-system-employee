'use client'
import React,{useState,useEffect} from 'react'
import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { Loader } from "lucide-react";

const GetallTrackedCars = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "servicetracker");
  type Timestamp = {
    seconds: number;
    nanoseconds: number;
  };
  useEffect(() => {
    try {
        const q1 = query(
            colRef,
            where("employeeEmail","==","henrytweneboah956@gmail.com"),
        );
        const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
            setLoading(true);
            setData([]);
            let list:any= [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
            console.log(list)
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
const formatDate = (timestamp: Timestamp): string => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  return date.toUTCString(); // or use any other format you prefer
};
  return (
    <div className='p-3'>
    <p className='text-xl font-medium'>A list of tracked cars from your created service tracker</p>
  <Table>
<TableHeader>
  <TableRow>
    <TableHead>Client Name</TableHead>
    <TableHead>Job Number</TableHead>
    <TableHead>Phone Number</TableHead>
    <TableHead>Serviced Date</TableHead>
    <TableHead>Next Service Date</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
{data?.length > 0 && loading == false ? (
            data.map((item: any) => (
              <TableRow key={item.id} className="">
              <TableCell className="font-medium">{item.Client_name}</TableCell>
              <TableCell>
                {item.Job_number}
              </TableCell>
              <TableCell>{item.Phone_number}</TableCell>
              <TableCell>{formatDate(item.Service_date)}</TableCell>
              <TableCell>{item.Next_Service_date}</TableCell>
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

export default GetallTrackedCars