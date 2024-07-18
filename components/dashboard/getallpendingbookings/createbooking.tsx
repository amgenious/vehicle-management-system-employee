'use client'
import React,{useState} from 'react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { addDoc, collection, serverTimestamp,doc, updateDoc} from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';

const CreateBooking = () => {
    
    const [name, setName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [carnumber, setCarNumber] = useState("");
    const [email, setEmail] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [mileage, setMileage] = useState("");
    const [chassisnumber, setChassisNumber] = useState("");
    const [dateofbooking, setDateofbooking] = useState("");
    const [reportingtime, setReportingTime] = useState("");
    const [faultdescription, setFaultDescription] = useState("");

    function generateRandomFiveDigitNumber(): number {
        return Math.floor(10000 + Math.random() * 90000);
      }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const rnf = generateRandomFiveDigitNumber()
  const job = `${dateofbooking}${reportingtime}${rnf}`
  const jobnumber = job.replace(/[-:]/g, '')
  try{
    await addDoc(collection(db,"bookings"),{
      name:name,
      phonenumber:phonenumber,
      email:email,
      carnumber:carnumber,
      manufacturer:manufacturer,
      model:model,
      dateofbooking:dateofbooking,
      reportingtime:reportingtime,
      faultdescription:faultdescription,
      status:"Pending",
      Job_number:jobnumber,
      timeStamps: serverTimestamp(), 
    })
    alert("Data sent to database")
  }catch(error){
    console.log(error)
  }
      }
  return (
    <div>
    <Sheet>
  <SheetTrigger asChild>
    <Button variant="default">Create Booking</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Create Booking</SheetTitle>
      <SheetDescription>
        Create a new booking for a job
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="flex flex-col gap-4">
      <input className="border-black border-2 rounded-sm p-2" placeholder="Full Name" onChange={(e)=> setName(e.target.value)} />
          <input className="border-black border-2 rounded-sm p-2" placeholder="Phone Number" onChange={(e)=> setPhoneNumber(e.target.value)}/>
          <input className="border-black border-2 rounded-sm p-2" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
          <input className="border-black border-2 rounded-sm p-2" placeholder="Vehicle Registration Number" onChange={(e)=> setCarNumber(e.target.value)}/>
          <input className="border-black border-2 rounded-sm p-2" placeholder="Manufacturer"onChange={(e)=> setManufacturer(e.target.value)} />
          <input className="border-black border-2 rounded-sm p-2" placeholder="Model" onChange={(e)=> setModel(e.target.value)}/>
          <input className="border-black border-2 rounded-sm p-2" placeholder="Mileage" onChange={(e)=> setMileage(e.target.value)}/>
          <input className="border-black border-2 rounded-sm p-2" placeholder="Chassis Number" onChange={(e)=> setChassisNumber(e.target.value)}/>
          <input className="border-black border-2 rounded-sm p-2" placeholder="Date of Booking" type="date" onChange={(e)=> setDateofbooking(e.target.value)}/>
          <input className="border-black border-2 rounded-sm p-2" placeholder="Reporting Time" type="time"  onChange={(e)=> setReportingTime(e.target.value)}/>
          <textarea className="border-black border-2 rounded-sm p-2" placeholder="Fault Description" onChange={(e)=> setFaultDescription(e.target.value)}></textarea>
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit" onClick={handleSubmit}>Save</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
</div>
  )
}

export default CreateBooking