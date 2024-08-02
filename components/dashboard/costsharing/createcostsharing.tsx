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
interface CreateCostSharingProps {
    name: string;
    carnumber:string,
    jobnumber:string,
    remarks:any,
    totalbill:any,
    labour:any,
    employeeEmail:any
  }

const CreateCostSharing:React.FC<CreateCostSharingProps> = ({
    name,carnumber,jobnumber,totalbill,employeeEmail,labour,remarks
}) => {
    const [rikpat, setRikpat] = useState("");
    const [otherservices, setOtherServices] = useState("");
    const [cctu, setCCTU] = useState("");
    const [blater, setBlater] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();
  try{
    await addDoc(collection(db,"costsharing"),{
        client:name,
        date:date,
        vehicle_registration_number:carnumber,
        Job_number:jobnumber,
        Labour:labour,
        otherservices:otherservices,
        rikpat:rikpat,
        totalbill:totalbill,
        remarks:remarks,
        CCTU:cctu,
        employeeEmail: employeeEmail,
        Mr_Benedict_Blater:blater,
      timeStamps: serverTimestamp(), 
    })
    alert("Cost Sharing Created")
  }catch(error){
    alert(error)
    console.log(error)
  }
      }

  return (
    <div>
    <Sheet>
  <SheetTrigger asChild>
    <Button variant="default">Create Cost Sharing</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Create Cost Sharing</SheetTitle>
      <SheetDescription>
        Create Cost Sharing for this invoice
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="flex flex-col gap-4">
      <input className="border-black border-2 rounded-sm p-2" placeholder="Other Services" onChange={(e)=> setOtherServices(e.target.value)}/>
      <input className="border-black border-2 rounded-sm p-2" placeholder="Rikpat" onChange={(e)=> setRikpat(e.target.value)}/>
      <input className="border-black border-2 rounded-sm p-2" placeholder="CCTU" onChange={(e)=> setCCTU(e.target.value)}/>
      <input className="border-black border-2 rounded-sm p-2" placeholder="Mr.Benedict Blater" onChange={(e)=> setBlater(e.target.value)}/>
      <input className="border-black border-2 rounded-sm p-2" type='date' placeholder="Date" onChange={(e)=> setDate(e.target.value)}/>
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

export default CreateCostSharing