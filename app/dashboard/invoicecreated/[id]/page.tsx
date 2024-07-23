'use client'
import React,{useState,useEffect,useRef} from 'react'
import { db } from '@/lib/firebaseConfig'
import {
    getDoc
    ,doc
} from "firebase/firestore";
import { Loader } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { logo } from '@/public/images';
import CreateCostSharing from '@/components/dashboard/costsharing/createcostsharing';


const InvoiceDetails = ({params}:any) => {
  interface DocumentData{
    name?: any;
    status?: string;
    phonenumber?: any;
    carnumber?: any;
    [key: string]: any;
}
    const id = params.id
    const [data, setData] = useState<DocumentData>({});
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
      const fetchData = async () => {
        await GetInvoiceById();
      };
      fetchData();
        
    }, []);
    const GetInvoiceById = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "invoice",id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setData({id:docSnap.id, ...docSnap.data()});
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
        setLoading(false);
      };
    
  return (
    <div  className='flex flex-col flex-1 h-full w-full bg-slate-100'>
      <div className='w-full flex justify-between p-3 h-fit bg-white'>
        <div>
        <p className='text-primary text-3xl font-black'>Invoice Details</p>
        <p className='font-medium text-xs italic'>Details about the Invoice</p>
        </div>
        <div className='hidden md:block'>
          <CreateCostSharing 
          name={data.Client_name} 
          carnumber={data.Vehicle_Registration_Number} 
          jobnumber={data.Job_number} 
          item={data.Parts_used} 
          quantity={data.Quantity} 
          retailprice={data.Unit_Price} 
          totalbill={data.Net_Price}
          labour={data.Labour} 
          employeeEmail={data.EmployeeEmail}          
          />
        </div>
    </div>
    {
        loading ? (
            <Loader size={40} className="animate-spin ml-2 text-primary text-center" />
        ):(
    <div className='p-5 mt-5 bg-white'>
      <div className='w-full flex justify-center items-center p-5 gap-5'>
        <div>
          <Image src={logo} alt='logo'/>
        </div>
        <div>
          <h1 className='text-4xl font-bold'>CCTU VEHICLE SERVICE CENTER</h1>
          <p className=''>Email: <u className='cursor-pointer font-semibold'>avic.center@cctu.edu.gh</u></p>
          <div className='mt-5'>
            <p>P.O.BOX DL 50 CAPE COST C/R GHANA</p>
            <p className='font-semibold'>TEL: 0509687271/0537929495</p>
          </div>
        </div>
      </div>
      <h1 className='text-3xl font-bold'>Cash Invoice</h1>
      <div className='w-full flex justify-between mt-3'>
          <div>
            <p className='italic font-semibold'>Client Details</p>
            <p className='font-bold'>Client Name: {data.Client_name}</p>
            <p className='font-bold'>Car Number: {data.Vehicle_Registration_Number}</p>
            <p className='font-bold'>Fault Reported: {data.fault}</p>
          </div>
          <div>
            <p className='italic font-semibold'>Job Details</p>
            <p className='font-bold'>Job Number: {data.Job_number}</p>
            <p className='font-bold'>Employee Email: {data.EmployeeEmail}</p>
            <p className='font-bold'>Employee Remarks: {data.Employeeremarks}</p>
          </div>
      </div>
      <div className='mt-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parts Used</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Labour</TableHead>
            <TableHead>Net Price</TableHead>
            <TableHead>Manager</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
              <TableRow>
                <TableCell>{data.Parts_used}</TableCell>
                <TableCell>{data.Quantity}</TableCell>
                <TableCell>{data.Unit_Price}</TableCell>
                <TableCell>{data.Labour}</TableCell>
                <TableCell>{data.Net_Price}</TableCell>
                <TableCell>{data.manager}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
      </div>
    </div>
      )
    }
      </div>
  )
}

export default InvoiceDetails
