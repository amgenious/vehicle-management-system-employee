'use client'
import CreateBooking from '@/components/dashboard/getallpendingbookings/createbooking'
import GetallBookings from '@/components/dashboard/getallpendingbookings/getallbookings'
import {Loader, Search, X } from 'lucide-react'
import React,{useState} from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import {db} from '../../../lib/firebaseConfig'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from 'next/link'

const PendingBookings = () => {
  const [openmodal, setCloseModal] = useState(false)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateofbooking, setDateofbooking] = useState("")
  const handleClick =  async (e:any) => {
    e.preventDefault();
    console.log(dateofbooking)

    const colRef = collection(db, 'bookings');
      
    // Create start and end timestamps for the specified date
    const startOfDay = new Date(dateofbooking);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(dateofbooking);
    endOfDay.setHours(23, 59, 59, 999);
    
    const startTimestamp = Timestamp.fromDate(startOfDay);
    const endTimestamp = Timestamp.fromDate(endOfDay);
  
    const q = query(
      colRef,
      where('timeStamps', '>=', startTimestamp),
      where('timeStamps', '<=', endTimestamp),
      orderBy('timeStamps', 'desc')
    );
    const unsubscribeSnapshot = onSnapshot(q, (snapShot) => {
      setLoading(true);
      setData([]);
      let list: any = [];
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
  

  }
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
     <div className='w-full flex justify-between p-3 h-fit bg-white'><p className='text-primary text-3xl font-black'>Pending Bookings</p>
     <div className='flex gap-10 justify-center items-center'>
     <div className='bg-primary p-2 text-white rounded-md text-sm cursor-pointer hover:bg-blue-500'
     onClick={()=>setCloseModal(true)}
     >
      Query Bookings
      </div>
     <CreateBooking />
     </div>
     </div>
     <div className='p-3 h-full flex flex-col gap-5'>
     <GetallBookings />
     </div>
     {openmodal ?
     
     <div className='absolute w-[102.5rem] h-[58rem] bg-white flex flex-col gap-5 items-center pt-5'>
     <div className='p-5 border w-fit rounded-md'>
      <X className='text-white rounded-lg cursor-pointer mb-3 bg-red-500' onClick={()=>setCloseModal(false)}/>
       <div>
        <p className='text-primary text-xl font-bold mb-4'>Query Bookings by Dates</p>
        <div className='flex justify-center items-center gap-3 mb-5'>
        <input className="border-primary border-2 rounded-sm p-2 w-full" placeholder="Date of Booking" type="date" onChange={(e) => setDateofbooking(e.target.value)} />
        <div className='bg-primary p-3 rounded-md'>
        <Search className='text-white cursor-pointer'
        onClick={handleClick}
        />
        </div>
        </div> 
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Mileage</TableHead>
            <TableHead>Chassis Number</TableHead>
            <TableHead>Vehicle Registration Number</TableHead>
            <TableHead className="text-center">More Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 && loading == false ? (
            data.map((item: any) => (
              <TableRow key={item.id} className="">
                <TableCell className="font-medium">
                  {item.Job_number}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phonenumber}</TableCell>
                <TableCell>{item.mileage}</TableCell>
                <TableCell>{item.chassisnumber}</TableCell>
                <TableCell>{item.carnumber}</TableCell>
                <TableCell className="bg-primary text-white text-center font-bold">
                  <Link href={`createservicereport/${item.id}`}>
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
      </div>
     </div>:<div className='hidden'></div>
    }
    </div>
  )
}

export default PendingBookings