import Headers from "@/components/header";
import Footer from "@/components/footer";
import GradientHighlight from "@/components/gradient-highlight";
import TickBoxItem from "@/components/tick-box-item";
import FlexibleBox from "@/components/flexible-box";

import DataTranscode from "@/lib/helper/data-transcode";

import tnc from "@/const/tnc/invoice.json"
import { headers } from "next/headers";

const defaultData = {
    "companyName": "NXG Global Sdn Bhd",
    "companyRegNo": "1129502-X",
    "companyAddress": {
        "street": "Unit 67 & 68, Block K, Alamesra Plaza Utama, Jalan Sulaman",
        "postcode": "88450",
        "city": "Kota Kinabalu",
        "state": "Sabah",
        "country": "Malaysia"
    },
    "tel": "088-488 888",
    "fax": "088-488 888",
    "logo": "/images/ewg-logo.png",
    // "logo": "https://images.unsplash.com/photo-1597626133663-53df9633b799?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "logoAlt": "EW Global Logo",
    "type": "Purchase Order"
}

export default async function Receipt({ searchParams }: { searchParams: any }) {
    const data = await searchParams?.data
    const dataJson = await JSON.parse(data)

    const brands = dataJson?.brands
    const orderDate = dataJson?.orderDate

    const tickItem = { brands, orderDate }

    const updatedData = {
        ...defaultData,
        createdAt: headers().get('X-CreatedAt')?.toString() ?? null,
        version: headers().get('X-version') ?? null,
    };

    return (
        <div className="page">
            <Headers props={defaultData} />

            <div className="mx-12">
                {/* <CompanyInfo props={defaultData} /> */}
                {/* <TickBoxItem props={tickItem} /> */}
                <section>
                    <GradientHighlight props={{ title: "Details" }} />
                    <div className="grid grid-cols-3 text-xs justify-between py-2 mt-1">
                        <div className="grid grid-cols-1">
                            <div className="font-semibold">Order No:</div>
                            <div className="text-black/70">{dataJson?.orderNo}</div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="font-semibold">Customer:</div>
                            <div className="text-black/70">{dataJson?.customer_name}</div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className=" font-semibold">Order Date:</div>
                            <div className="text-black/70">{dataJson?.orderDate}</div>
                        </div>
                    </div>
                </section>
                <hr className="mt-2 bg-teal-600 max-h-0.5 min-h-0.5" />
                <div className=" grid grid-cols-2 gap-4">
                    <FlexibleBox id="billTo" title="Bill To:">
                        <div className="font-bold">{dataJson?.billTo?.name}</div>
                        <div className="mt-4">{dataJson?.billTo?.address?.street}</div>
                        <div>{dataJson?.billTo?.address?.postcode} {dataJson?.billTo?.address?.city}</div>
                        <div>{dataJson?.billTo?.address?.country}</div>
                        <div className="mt-4">{dataJson?.billTo?.contactNo}</div>
                        <div>{dataJson?.billTo?.email}</div>
                    </FlexibleBox>
                    <FlexibleBox id="shipTo" title="Ship To:">
                        <div className="font-bold">{dataJson?.shipTo?.name}</div>
                        <div className="mt-4">{dataJson?.shipTo?.address?.street}</div>
                        <div>{dataJson?.shipTo?.address?.postcode} {dataJson?.shipTo?.address?.city}</div>
                        <div>{dataJson?.shipTo?.address?.country}</div>
                        <div className="mt-4">{dataJson?.shipTo?.contactNo}</div>
                        <div>{dataJson?.shipTo?.email}</div>
                    </FlexibleBox>
                </div>
                <div className="py-2">
                    <table className="table-fixed min-w-full outline outline-1 outline-teal-600">
                        <thead className="text-white text-xs bg-teal-600 h-10">
                            <tr>
                                <th className="text-center font-normal min-w-20 max-w-20 px-1">No</th>
                                <th className="text-left font-normal min-w-20 max-w-20 px-1">Code</th>
                                <th className="text-left font-normal w-full px-1">Description & Specification</th>
                                <th className="text-center font-normal min-w-20 max-w-20 px-1">Qty</th>
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
                                            <td className="px-1">{ }</td>
                                        </tr>
                                    ))
                                    : null
                            }
                            {
                                dataJson?.item?.map((item: any, index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-teal-100/25" : ""}>
                                        <td className="text-center px-1 py-1">{index + 1}</td>
                                        <td className="px-1">{item.code}</td>
                                        <td className="px-1">
                                            <div>{item.description}</div>
                                            <div>{item.specification}</div>
                                        </td >
                                        <td className="px-1 text-center">{item.quantity}</td>
                                        <td className="px-1">{item.unitBase}</td>
                                        <td className="px-1">{item.amount}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="text-xs text-gray-500">
                    *This is a computer generated purchase order and does not require a signature.
                </div>
                <Footer props={tnc} />
            </div>
        </div >
    );
}
