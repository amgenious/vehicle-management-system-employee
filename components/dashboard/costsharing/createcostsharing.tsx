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
    employeeEmail:any,
    discount:any
  }

const CreateCostSharing:React.FC<CreateCostSharingProps> = ({
    name,carnumber,jobnumber,totalbill,employeeEmail,labour,remarks,discount
}) => {
  const [rikpatValues, setRikpatValues] = useState<{ [key: string]: string }>({});
    const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
    const [otherservices, setOtherServices] = useState("");
    const [cctu, setCCTU] = useState("");
    const [blater, setBlater] = useState("");
    const [date, setDate] = useState("");

    const handleInputChange = (id: string, value: string) => {
      setRikpatValues(prevState => ({ ...prevState, [id]: value }));
    };
    const handleSubmit = async (e:any) => {
        e.preventDefault();
  try{
    const filteredInputs = Object.entries(rikpatValues)
        .filter(([key, value]) => value.trim() !== "")
        .map(([key, value]) => ({ id: key, value }));
    await addDoc(collection(db,"costsharing"),{
        client:name,
        date:date,
        vehicle_registration_number:carnumber,
        Job_number:jobnumber,
        Labour:labour,
        otherservices:otherservices,
        rikpat:filteredInputs,
        totalbill:totalbill,
        remarks:remarks,
        CCTU:cctu,
        discount:discount,
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
      <ul>
                {remarks?.map((remark: { id: string, value: string, parts_used: string, net_price: string }, index: any) => (
                  <li className='font-semibold' key={remark.id}>
                    <div className='flex justify-between'>
                      <div>
                        <span>Part Used: </span>
                        {remark.parts_used}
                      </div>
                      <div>
                        <span>Unit Price: </span>
                        {remark.net_price}
                      </div>
                    </div>
                    <input
                      className="border-black border-2 rounded-sm p-2 w-full mb-2"
                      placeholder="Rikpat"
                      value={rikpatValues[remark.id] || ""}
                      onChange={e => handleInputChange(remark.id, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
      <input className="border-black border-2 rounded-sm p-2" placeholder="Other Services" onChange={(e)=> setOtherServices(e.target.value)}/>
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