'use client'
import React,{useState,useEffect} from 'react'
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
import { addDoc, collection, onSnapshot, query, serverTimestamp,} from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';
import { Loader } from 'lucide-react';

const CreateBooking = () => {
    const [data, setData] = useState<number>(0);
    const colRef = collection(db, "bookings");
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [carnumber, setCarNumber] = useState("");
    const [email, setEmail] = useState("");
    const [makemodel, setMakeModel] = useState("");
    const [chassisnumber, setChassisnumber] = useState("");
    const [mileage, setMileage] = useState("");
    const [dateofbooking, setDateofbooking] = useState("");
    const [reportingtime, setReportingTime] = useState("");
    const [faultdescription, setFaultDescription] = useState("");
    useEffect(() => {
      try {
        const q1 = query(colRef);
        const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
          setLoading(true);
          let list: any = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list.length);
          setLoading(false);
        });
        return () => {
          unsubscribeSnapshot();
        };
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    }, []);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const prefix = 0;
        const rnf = data + 1;
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        const job = `${prefix}${rnf}${day}${month}${year}`;
        const jobnumber = job.replace(/[-:]/g, '');
        console.log(jobnumber)
  try{
    await addDoc(collection(db,"bookings"),{
      name:name,
      phonenumber:phonenumber,
      email:email,
      carnumber:carnumber,
      makemodel:makemodel,
      chassisnumber:chassisnumber,
      mileage:mileage,
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
    {
      loading ? <Loader
      size={40}
      className="animate-spin ml-2 text-primary text-center"
    />:(
    <><div className="grid gap-1 py-1">
                  <div className="flex flex-col gap-1">
                    <input className="border-black border-2 rounded-sm p-2" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                    <input className="border-black border-2 rounded-sm p-2" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
                    <input className="border-black border-2 rounded-sm p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input className="border-black border-2 rounded-sm p-2" placeholder="Vehicle Registration Number" onChange={(e) => setCarNumber(e.target.value)} />
                    <input className="border-black border-2 rounded-sm p-2" placeholder="Make & Model" onChange={(e) => setMakeModel(e.target.value)} />
                    <input className="border-black border-2 rounded-sm p-2" placeholder="ChassisNumber" onChange={(e) => setChassisnumber(e.target.value)} />
                    <input className="border-black border-2 rounded-sm p-2" placeholder="Mileage" onChange={(e) => setMileage(e.target.value)} />
                    <input className="border-black border-2 rounded-sm p-2" placeholder="Date of Booking" type="date" onChange={(e) => setDateofbooking(e.target.value)} />
                    <input className="border-black border-2 rounded-sm p-2" placeholder="Reporting Time" type="time" onChange={(e) => setReportingTime(e.target.value)} />
                    <textarea className="border-black border-2 rounded-sm p-2" placeholder="Fault Description" onChange={(e) => setFaultDescription(e.target.value)}></textarea>
                  </div>
                </div><SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit" onClick={handleSubmit}>Save</Button>
                    </SheetClose>
                  </SheetFooter></>)    }
  </SheetContent>
</Sheet>
</div>
  )
}

export default CreateBooking
