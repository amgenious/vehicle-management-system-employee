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
interface CreateServiceReportProps {
    name: string;
    phonenumber: string;
    carnumber:string,
    model:string,
    fault:string,
    reportingtime:string
    id:string,
    jobnumber:string
    employeeEmail:any
  }

const CreateServiceReport:React.FC<CreateServiceReportProps> = ({ name, phonenumber,carnumber,model,fault,reportingtime,jobnumber,id,employeeEmail }) => {
    const [remarks, setRemarks] = useState("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();
       const onSubmit=async()=>{
        const docRef=doc(db,'bookings',id)
        await updateDoc(docRef,{
            status:"Processed"
        })
    }
        try{
          await addDoc(collection(db,"customerservicereport"),{
          name:name,
          phonenumber:phonenumber,
          carnumber:carnumber,
          model:model,
          reportingtime:reportingtime,
          faultdescription:fault,
          status:"Processed",
          Job_number:jobnumber,
          remarks:remarks,
          timeStamps: serverTimestamp(), 
          EmployeeEmail:employeeEmail
          })
          onSubmit()
          alert("Service Report Created")
        }catch(error){
          console.log(error)
        }
      }
  return (
    <div>
        <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Create Service Report</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Service Report</SheetTitle>
          <SheetDescription>
            Create Service Report for this booking
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
           <p>Servicing Made on this booking</p>
            <textarea id="name" className="col-span-3 p-2"  onChange={(e)=> setRemarks(e.target.value)}></textarea>
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

export default CreateServiceReport