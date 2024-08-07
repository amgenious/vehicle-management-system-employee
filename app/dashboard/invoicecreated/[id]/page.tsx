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
import { car, logo } from '@/public/images';
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
    <div  className='flex flex-col flex-1 h-full w-full bg-slate-100 over'>
      <div className='absolute bg-white h-[3.6rem] w-[102.5rem] top-0'></div>
      <div className='w-full justify-between p-3 h-fit bg-white hidden md:flex'>
        <div className=''>
        <p className='text-primary text-3xl font-black'>Invoice Details</p>
        <p className='font-medium text-xs italic'>Details about the Invoice</p>
        </div>
        <div className='hidden md:block'>
          <CreateCostSharing 
            name={data.Client_name}
            carnumber={data.Vehicle_Registration_Number}
            jobnumber={data.Job_number}
            remarks={data.Employeeremarks}
            totalbill={data.Net_Price}
            labour={data.Labour}
            discount={data.discount}
            employeeEmail={data.EmployeeEmail}           />
        </div>
    </div>
    {
        loading ? (
            <Loader size={40} className="animate-spin ml-2 text-primary text-center" />
        ):(
    <div className='p-5 mt-5 bg-white'>
      <div className='w-full flex justify-start items-start p-1 gap-5 mb-3'>
        <div>
          <Image src={logo} alt='logo' className='w-20 h-20' priority/>
        </div>
        <div>
          <h1 className='text-2xl font-bold'>CCTU VEHICLE SERVICE CENTER</h1>
          <p className=''>Email: <u className='cursor-pointer font-semibold'>avic.center@cctu.edu.gh</u></p>
          <div className='mt-2'>
            <p>P.O.BOX DL 50 CAPE COST C/R GHANA</p>
            <p className='font-semibold'>TEL: 0509687271/0537929495</p>
          </div>
        </div>
      </div>
      <h1 className='text-3xl font-bold uppercase'>Cash Invoice</h1>
      <div className='w-full flex justify-between mt-3'>
          <div className='border border-primary w-[50%]'>
            <p className='font-bold  border-b border-primary p-1'>Customer Name and Address</p>
            <p className='font-medium border-b border-primary p-1'>Client Name: <span className='font-bold'>{data.Client_name}</span></p>
            <p className='font-medium border-primary border-b p-1'> Tel <span className='font-bold'> 
              {rdata.map((item: any) => (
                item.phonenumber
              ))}
              </span></p>
              <p className='font-medium border-b border-primary p-1'>SA: <span className='font-bold'>{data.SA}</span></p>
          </div>
          <div  className='border border-primary w-[50%]'>
            <p className='font-medium border-b border-primary p-1'>Date: <span className='font-bold'>{ String(Date()).slice(0,15)}</span></p>
            <p className='font-medium border-b border-primary p-1'>JOB No: <span className='font-bold'>{data.Job_number}</span></p>
            <p className='font-medium border-b border-primary p-1'>Car No: <span className='font-bold'>{data.Vehicle_Registration_Number}</span></p>
            <p className='font-medium  p-1'>Manager: <span className='font-bold'>{data.manager}</span></p>
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
            <TableHead className='text-end'>Net Price (Ghc)</TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
                {data.Employeeremarks.map((remark: { id: React.Key | null | undefined; value: string | number | bigint | boolean; parts_used:string; quantity:number;unit_price:number;net_price:number| React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
              <TableRow key={remark.id}>
                <TableCell>{data.Parts_used}
                   <li className='font-semibold'>{remark.parts_used}</li>
              </TableCell>
                <TableCell>{remark.quantity}</TableCell>
                <TableCell>{remark.unit_price}</TableCell>
                <TableCell className='font-semibold text-end'>{remark.net_price}</TableCell>
              </TableRow>
                ))}
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow className='bg-primary'>
            <TableHead className='text-center text-white'>Description of Job</TableHead>
            <TableHead className='text-end text-white'>Labour (Ghc)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='text-center'><ul>
                {data.Employeeremarks.map((remark: { id: React.Key | null | undefined; value: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                  <li className='font-semibold' key={remark.id}>{remark.value}</li>
                ))}
              </ul></TableCell>
            <TableCell className='text-end font-bold'>{data.Labour}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow className='bg-primary'>
            <TableHead className='text-end text-white'>- Discount (Ghc)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='text-end font-bold'>{data.discount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow className='bg-primary'>
            <TableHead className='text-end font-black text-white'>Total Net Price (Ghc)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='text-end font-black'>{data.Net_Price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </div>
    </div>
      )
    }
    <div className='bg-white'>
    <Image src={car} alt='car' className='w-24 h-16' priority/>
    <div className='flex flex-col justify-center'>
      <p className='uppercase font-bold text-xl text-center'>Manager</p>
      <p className='p-1 bg-yellow-300 w-[50%] text-center font-bold px-16'>Where exceptional service meets unbeatable value!</p>
    </div>
    </div>
      </div>
  )
}

export default InvoiceDetails
