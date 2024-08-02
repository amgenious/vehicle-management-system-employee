import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addDoc, collection, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from '@/lib/firebaseConfig';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';

interface InvoiceProps {
  ide: string;
  employeeEmail: any;
}

interface Remark {
  id: string;
  value: string;
  parts_used?: string;
  quantity?: number;
  unit_price?: number;
  net_price?: number;
}

interface DocumentData {
  name?: string;
  status?: string;
  phonenumber?: string;
  carnumber?: string;
  remarks?: Remark[];
  [key: string]: any;
}

type RemarkKeys = 'parts_used' | 'quantity' | 'unit_price' | 'net_price';

const Invoiceforms: React.FC<InvoiceProps> = ({ ide, employeeEmail }) => {
  useEffect(() => {
    const fetchData = async () => {
      await GetBookingById();
    };
    fetchData();
  }, []);

  const [manager, setManager] = useState("");
  const [labour, setLabour] = useState<number>(0);
  const [data, setData] = useState<DocumentData>({ remarks: [] });
  const [loading, setLoading] = useState(true);

  const GetBookingById = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "customerservicereport", ide);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        const remarksWithDetails = (docData.remarks || []).map((remark: { id: string, value: string }) => ({
          ...remark,
          parts_used: '',
          quantity: 0,
          unit_price: 0,
          net_price: 0
        }));
        setData({ id: docSnap.id, ...docData, remarks: remarksWithDetails });
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching document:", error);
    }
  };

  const handleRemarkChange = (index: number, key: RemarkKeys, value: any) => {
    const updatedRemarks = [...(data.remarks || [])];
    const remark = updatedRemarks[index];
    remark[key] = value;

    if (key === 'quantity' || key === 'unit_price') {
      remark.net_price = (remark.quantity || 0) * (remark.unit_price || 0);
    }

    setData({ ...data, remarks: updatedRemarks });
  };

  const calculateTotalNetPrice = () => {
    const remarksNetPrice = (data.remarks || []).reduce((total, remark) => total + (remark.net_price || 0), 0);
    return remarksNetPrice + labour
  };

  const handleSubmit = async () => {
    let jobnumber = data?.Job_number;
    let carnumner = data?.carnumber;
    let fault = data?.faultdescription;
    let Clientname = data?.name;
    let Employeeremarks = data?.remarks;

    try {
      await addDoc(collection(db, "invoice"), {
        manager: manager,
        EmployeeEmail: employeeEmail,
        Employeeremarks: Employeeremarks,
        Labour: labour,
        Net_Price:calculateTotalNetPrice(),
        Job_number: jobnumber,
        Client_name: Clientname,
        Vehicle_Registration_Number: carnumner,
        fault: fault,
        timeStamps: serverTimestamp(),
      });
      alert("Invoice Created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='border-2 border-red-500'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default">Create Invoice</Button>
        </SheetTrigger>
        <SheetContent className='overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>Create Invoice</SheetTitle>
            <SheetDescription>
              Create Invoice for this booking
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-2 py-2  px-2">
            <div className="flex flex-col gap-2">
              <div>
                <p>Manager</p>
                <Input className="col-span-3 p-2" onChange={(e) => setManager(e.target.value)} required />
              </div>
              <div>
                <p className='font-normal'>Employee Remarks:</p>
                <ul>
                  {data.remarks?.map((remark, index) => (
                    <li className='font-semibold' key={remark.id}>
                      {remark.value}
                      <div>
                        <p>Parts Used</p>
                        <Input className="col-span-3 p-2" onChange={(e) => handleRemarkChange(index, 'parts_used', e.target.value)} required />
                      </div>
                      <div>
                        <p>Quantity</p>
                        <Input className="col-span-3 p-2" type='number' onChange={(e) => handleRemarkChange(index, 'quantity', parseFloat(e.target.value))} required />
                      </div>
                      <div>
                        <p>Unit Price</p>
                        <Input className="col-span-3 p-2" type='number' onChange={(e) => handleRemarkChange(index, 'unit_price', parseFloat(e.target.value))} required />
                      </div>
                      <div>
                        <p>Amount</p>
                        <div className="col-span-3 p-2">{remark.net_price}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p>Labour</p>
                <Input className="col-span-3 p-2" type='number' value={labour} onChange={(e) => setLabour(parseFloat(e.target.value))} required />
              </div>
              <div>
                <p>Total Net Price</p>
                <div className="col-span-3 p-2 font-bold">{calculateTotalNetPrice()}</div>
              </div>
            </div>
          </div>
          {
            loading ? (
              <Loader size={40} className="animate-spin ml-2 text-primary text-center" />
            ) : (
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" onClick={handleSubmit}>Save</Button>
                </SheetClose>
              </SheetFooter>
            )
          }
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Invoiceforms;
