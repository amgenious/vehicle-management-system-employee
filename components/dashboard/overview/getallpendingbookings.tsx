'use client'
import React, { useState, useEffect } from 'react'
import { db } from "@/lib/firebaseConfig";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import {
    collection,
    query,
    onSnapshot,
    limit,
    where,
} from "firebase/firestore";
import { Loader } from 'lucide-react';



const GetAllPendingBookings = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const colRef = collection(db, "bookings");

    useEffect(() => {
        try {
            const q1 = query(
                colRef,
                where("status","==","Pending"),
                limit(5)
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

    return (
        <div className='p-3'>
            <p className='text-xl font-medium'>A list of all pending bookings.</p>
            <Table>
                <TableCaption>Click <i className='text-primary font-bold cursor-pointer'>here</i> for all pending bookings</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Number</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Vehicle Registration Number</TableHead>
                        <TableHead className='text-center'>More Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                         data?.length > 0 && loading==false ?  (
                            data.map((item:any) => (
                                <TableRow key={item.id} className=''>
                                    <TableCell className="font-medium">{item.Job_number}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.phonenumber}</TableCell>
                                    <TableCell>{item.carnumber}</TableCell>
                                    <TableCell className='bg-primary text-white text-center font-bold'>
                                        <Link href={`dashboard/createservicereport/${item.id}`}>
                                            Details
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        ):loading ? (<Loader size={40} className="animate-spin ml-2 text-primary text-center" />
                      ) : (
                        <p>No Data Available</p>
                      )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default GetAllPendingBookings;
