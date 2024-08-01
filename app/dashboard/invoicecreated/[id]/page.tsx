'use client'
import React,{useState,useEffect,useRef} from 'react'
import { db } from '@/lib/firebaseConfig'
import {
    getDoc
    ,doc,
    collection,
    query,
    where,
    onSnapshot,
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
    const [pdata, setPData] = useState<DocumentData>({});
    const [rdata, setRData] = useState([]);
    const [loading, setLoading] = useState(true);
    const colRef = collection(db, "bookings");
   

    useEffect(() => {
      const fetchData = async () => {
        await GetInvoiceById();
      };
      fetchData();
    }, []);
  
    const GetInvoiceById = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "invoice", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setData({ id: docSnap.id, ...data });
          setPData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      if (pdata) {
        console.log("pData state updated:", pdata);
        if (pdata.Job_number) {
          const q1 = query(colRef, where("Job_number", "==", pdata.Job_number));
          const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
            let list:any = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setRData(list);
          });
          return () => {
            unsubscribeSnapshot();
          };
        } else {
          console.error("pdata.Job_number is undefined");
        }
      } else {
        console.log("pData is null, second useEffect not triggered");
      }
    }, [pdata]);
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
      <div className='w-full flex justify-start items-center p-5 gap-5'>
        <div>
          <Image src={logo} alt='logo' priority/>
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
      <h1 className='text-3xl font-bold uppercase'>Cash Invoice</h1>
      <div className='w-full flex justify-between mt-3'>
          <div>
            <p className='font-bold'>Customer Name and Address</p>
            <p className='font-semibold'> {data.Client_name}</p>
            <p className='font-semibold'> P.O.BOX <span className='uppercase'>CCTU</span></p>
            <p className='font-semibold'> Tel <span> 
              {rdata.map((item: any) => (
                item.phonenumber
              ))}
              </span></p>
          </div>
          <div>
            <p className='font-semibold'>Date: <span className='font-bold'>{ String(Date()).slice(0,15)}</span></p>
            <p className='font-semibold'>JOB No: <span className='font-bold'>{data.Job_number}</span></p>
            <p className='font-semibold'>Car No: <span className='font-bold'>{data.Vehicle_Registration_Number}</span></p>
            <p className='font-semibold'>Employee Email: <span className='font-bold'>{data.EmployeeEmail}</span></p>
            <p className='font-semibold'>Manager: <span className='font-bold'>{data.manager}</span></p>
          </div>
      </div>
      <div className='mt-3 flex flex-col gap-3'>
      <p><span className='p-1 bg-primary text-white'>Make/Model: </span> <span className='font-bold pl-2'> {rdata.map((item: any) => (
                 item.makemodel
              ))}</span></p>        
      <p> <span className='p-1 bg-primary text-white '>Chassis Number: </span>  <span className='font-bold pl-2'> {rdata.map((item: any) => (
                 item.chassisnumber
              ))}</span></p>        
      </div>
      <div className='mt-5'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parts Used</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price (Ghc)</TableHead>
            <TableHead>Labour (Ghc)</TableHead>
            <TableHead>Net Price (Ghc)</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
              <TableRow>
                <TableCell>{data.Parts_used}</TableCell>
                <TableCell>{data.Quantity}</TableCell>
                <TableCell>{data.Unit_Price}</TableCell>
                <TableCell>{data.Labour}</TableCell>
                <TableCell>{data.Net_Price}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
      </div>
       {/* <p className='font-normal'>Employee Remarks: 
            <ul>
                {data.Employeeremarks.map((remark: { id: React.Key | null | undefined; value: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                  <li className='font-semibold' key={remark.id}>{remark.value}</li>
                ))}
              </ul>
            </p> */}
    </div>
      )
    }
      </div>
  )
}

export default InvoiceDetails
