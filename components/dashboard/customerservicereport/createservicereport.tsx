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
import { Plus, Trash } from 'lucide-react';
interface CreateServiceReportProps {
    name: string;
    phonenumber: string;
    carnumber:string,
    makemodel:string,
    fault:string,
    reportingtime:string
    id:string,
    jobnumber:string
    employeeEmail:any,
    chassisnumber:any
  }

const CreateServiceReport:React.FC<CreateServiceReportProps> = ({ name, phonenumber,carnumber,makemodel,fault,reportingtime,jobnumber,id,employeeEmail,chassisnumber }) => {
    const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
    const addInputField = () => {
      setInputs([...inputs, { id: inputs.length + 1, value: '' }]);
    };
    const removeInputField = (id:any) => {
      setInputs(inputs.filter(input => input.id !== id));
    };
    const handleInputChange = (id:any, value:any) => {
      setInputs(inputs.map(input => (input.id === id ? { ...input, value } : input)));
    };
    const handleSubmit = async (e:any) => {
      e.preventDefault();
       const onSubmit=async()=>{
        const docRef=doc(db,'bookings',id)
        await updateDoc(docRef,{
            status:"Processed"
        })
    }
        try{
          const filteredInputs = inputs.filter(input => input.value !== undefined && input.value.trim() !== "");
          await addDoc(collection(db,"customerservicereport"),{
          name:name,
          phonenumber:phonenumber,
          carnumber:carnumber,
          makemodel:makemodel,
          chassisnumber:chassisnumber,
          reportingtime:reportingtime,
          faultdescription:fault,
          status:"Processed",
          Job_number:jobnumber,
          remarks:filteredInputs,
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
            <div className='flex justify-between'>
           <p>Servicing Made on this booking</p>
           <div className='cursor-pointer border-black rounded-lg border hover:border-primary hover:text-primary'
           onClick={addInputField}
           >
            <Plus />
           </div>
            </div>
            {inputs.map(input => (
       <div key={input.id} className="flex items-center gap-2">
       <input
         className="border-black border-2 rounded-sm p-2 flex-grow"
         placeholder="Remarks"
         value={input.value}
         onChange={e => handleInputChange(input.id, e.target.value)}
       />
       <div
         className="cursor-pointer"
         onClick={() => removeInputField(input.id)}
       >
         <Trash className='text-red-700' />
       </div>
     </div>
      ))}
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