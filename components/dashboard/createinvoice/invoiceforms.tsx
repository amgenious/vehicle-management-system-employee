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

import { addDoc, collection, serverTimestamp,doc, getDoc} from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';
interface InvoiceProps {
    ide:string,
    employeeEmail:any
  }

const Invoiceforms:React.FC<InvoiceProps> = ({ ide, employeeEmail }) => {
   useEffect(()=>{
    const fetchData = async () => {
        await GetBookingById();
      };
      fetchData();
   },[])
    interface DocumentData{
        name?: string;
        status?: string;
        phonenumber?: string;
        carnumber?: string;
        [key: string]: any;
    } 
    const [manager, setManager] = useState("");
    const [parts_used, setPartsUsed] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit_price, setUnitPrice] = useState<number>(0);
    const [net_price, setNetPrice] = useState<number>(0);
    const [labour, setLabour] = useState<number>(0);
    const [data, setData] = useState<DocumentData>({});
    const [loading, setLoading] = useState(true);
    const GetBookingById = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "customerservicereport",ide);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setData({id:docSnap.id, ...docSnap.data()});
          } else {
            console.log("No such document!");
          }
          setLoading(false);
        } catch (error) {
            setLoading(false);
          console.error("Error fetching document:", error);
        }
        setLoading(false);
      };
   
useEffect(()=>{
   setNetPrice(unit_price + labour);
},[unit_price,labour])
    const handleSubmit = async()=>{
       let jobnumber = data?.Job_number
       let carnumner = data?.carnumber
       let fault = data?.faultdescription
       let Clientname= data?.name
       let Employeeremarks= data?.remarks
            try{
                await addDoc(collection(db,"invoice"),{
                    manager:manager,
                    EmployeeEmail:employeeEmail,
                    Employeeremarks:Employeeremarks,
                    Parts_used:parts_used,
                    Quantity:quantity,
                    Unit_Price:unit_price,
                    Net_Price:net_price,
                    Labour:labour,
                    Job_number:jobnumber,
                    Client_name:Clientname,
                    Vehicle_Registration_Number:carnumner,
                    fault:fault,
                    timeStamps: serverTimestamp(), 
                })
                alert("Invoice Created")
              }catch(error){
                console.log(error)
              }
    }
  return (
    <div>
    <Sheet>
  <SheetTrigger asChild>
    <Button variant="default">Create Invoice </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Create Invoice</SheetTitle>
      <SheetDescription>
        Create Invoice for this booking
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="flex flex-col gap-4">
        <div>
       <p>Manager</p>
        <Input className="col-span-3 p-2"  onChange={(e)=> setManager(e.target.value)} required />
        </div>
        <div>
       <p>Parts Used</p>
        <Input className="col-span-3 p-2"  onChange={(e)=> setPartsUsed(e.target.value)} required />
        </div>
        <div>
       <p>Quantity</p>
        <Input className="col-span-3 p-2"  type='number' onChange={(e)=> setQuantity(e.target.value)} required />
        </div>
        <div>
       <p>Unit Price</p>
        <Input className="col-span-3 p-2" type='number'  value={unit_price} onChange={(e)=> setUnitPrice(parseFloat(e.target.value))} required />
        </div>
        <div>
       <p>Labour</p>
        <Input className="col-span-3 p-2" type='number'  value={labour} onChange={(e)=> setLabour(parseFloat(e.target.value))} required />
        </div>
        <div>
       <p>Net Price</p>
        <div className="col-span-3 p-2">{net_price}</div>
        </div>
      </div>
    </div>
    {
        loading ? (
            <Loader size={40} className="animate-spin ml-2 text-primary text-center" />
        ):(
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit" onClick={handleSubmit}>Save</Button>
      </SheetClose>
    </SheetFooter>
        )}
  </SheetContent>
</Sheet>
</div>
  )
}

export default Invoiceforms

