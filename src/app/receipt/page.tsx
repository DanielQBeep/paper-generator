"use client"
import GradientHighlight from "@/components/gradient-highlight";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'
import Headers from "@/components/header";
import Footer from "@/components/footer";
import CompanyInfo from "@/components/company-info";
import ReceiptData from "@/lib/helper/receipt-data";
import { tnc } from "@/const/tnc/receipt.json"

const defaultData = {
    "companyName": "EW Global Sdn Bhd",
    "companyRegNo": "1129502-X",
    "companyAddress": {
        "street": "Unit 67 & 68, Block K, Alamesra Plaza Utama, Jalan Sulaman",
        "postcode": "88450",
        "city": "Kota Kinabalu",
        "state": "Sabah",
        "country": "Malaysia"
    },
    "tel": ":+(60) 19-9580-178",
    "fax": ":+(60) 19-9580-178",
    "logo": "/images/ewg-logo.png",
    // "logo": "https://images.unsplash.com/photo-1597626133663-53df9633b799?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "logoAlt": "EW Global Logo",
    "type": "Receipt"
}

export default async function Receipt() {
    const searchParams = useSearchParams()
    const data = searchParams.get('data')
    const dataJson = await ReceiptData(data)

    return (
        <div className="page">
            <Headers props={defaultData} />
            <div className="mx-12">
                <CompanyInfo props={defaultData} />
                <section className="mt-4">
                    <GradientHighlight props={{ title: "Details" }} />
                    <div className="grid grid-cols-4 text-xs justify-between py-2 mt-1">
                        <div className="grid grid-cols-1">
                            <div className="font-semibold">Order No:</div>
                            <div className="text-black/70">{dataJson?.orderNo}</div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="font-semibold">Reference No:</div>
                            <div className="text-black/70">{dataJson?.referenceNo}</div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className=" font-semibold">Payment Mode:</div>
                            <div className="text-black/70">{dataJson?.paymentMode}</div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className=" font-semibold">Order Date:</div>
                            <div className="text-black/70">{dataJson?.orderDate}</div>
                        </div>
                    </div>
                </section>
                <hr className="mt-2 bg-teal-600 max-h-0.5 min-h-0.5" />
                <div className=" grid grid-cols-2 gap-4">
                    <div id="billTo">
                        <div className="font-semibold leading-6 mb-2 mt-2">Bill To:</div>
                        <div className=" text-xs outline outline-1 px-2 pt-3 h-full">
                            <div className="font-bold">{dataJson?.billTo?.name}</div>
                            <div className="mt-4">{dataJson?.billTo?.address?.street}</div>
                            <div>{dataJson?.billTo?.address?.postcode} {dataJson?.billTo?.address?.city}</div>
                            <div>{dataJson?.billTo?.address?.country}</div>
                            <div className="mt-4">{dataJson?.billTo?.contactNo}</div>
                            <div>{dataJson?.billTo?.email}</div>
                        </div>
                    </div>
                    <div id="shipTo">
                        <div className="font-semibold leading-6 mb-2 mt-2">Ship To:</div>
                        <div className=" text-xs outline outline-1 px-2 pt-3 h-full">
                            <div className="font-bold">{dataJson?.shipTo?.name}</div>
                            <div className="mt-4">{dataJson?.shipTo?.address?.street}</div>
                            <div>{dataJson?.shipTo?.address?.postcode} {dataJson?.shipTo?.address?.city}</div>
                            <div>{dataJson?.shipTo?.address?.country}</div>
                            <div className="mt-4">{dataJson?.shipTo?.contactNo}</div>
                            <div>{dataJson?.shipTo?.email}</div>
                        </div>
                    </div>
                </div>
                <div className="py-2 pt-14">
                    <table className="table-fixed min-w-full outline outline-1 outline-teal-600">
                        <thead className="text-white text-xs bg-teal-600 h-10">
                            <tr>
                                <th className="text-center font-normal min-w-20 max-w-20 px-1">Qty</th>
                                <th className="text-left font-normal min-w-20 max-w-20 px-1">Unit</th>
                                <th className="text-left font-normal w-full px-1">Description & Specification</th>
                                <th className="text-left font-normal min-w-24 max-w-24 px-1">Unit Price</th>
                                <th className="text-left font-normal min-w-24 max-w-24 px-1">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-black/50 text-xs">
                            {
                                !dataJson?.item
                                    ? Array.from({ length: 5 }, (_, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-teal-100/25" : ""}>
                                            <td className="text-center px-1 py-1">{"‎ "}</td>
                                            <td className="px-1">{ }</td>
                                            <td className="px-1">
                                                <div>{ }</div>
                                                <div>{ }</div>
                                            </td >
                                            <td className="px-1">{ }</td>
                                            <td className="px-1">{ }</td>
                                        </tr>
                                    ))
                                    : null
                            }
                            {
                                dataJson?.item?.map((item: any, index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-teal-100/25" : ""}>
                                        <td className="text-center px-1 py-1">{item.quantity}</td>
                                        <td className="px-1">{item.unit}</td>
                                        <td className="px-1">
                                            <div>{item.description}</div>
                                            <div>{item.specification}</div>
                                        </td >
                                        <td className="px-1">{item.unitBase}</td>
                                        <td className="px-1">{item.amount}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className=" grid grid-cols-3 py-2">
                    <div className=" col-span-2 text-xs text-gray-500">
                    </div>
                    <div className=" text-xs text-teal-700">
                        <div className="flex justify-between">
                            <div>Total before SST</div>
                            <div>{dataJson?.totalBeforeSST}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>SST 0%</div>
                            <div>{dataJson?.sst}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Total sales SST</div>
                            <div>{dataJson?.totalSalesSST}</div>
                        </div>
                    </div>
                </div>
                <div className=" col-span-2 text-xs text-gray-500">
                    *This is a computer generated invoice and does not require a signature.
                </div>
                <Footer props={{ tnc }} />
            </div>
        </div >
    );
}
