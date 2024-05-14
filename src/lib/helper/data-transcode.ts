import { Condiment } from "next/font/google"
import BrandTicker from "../brand-ticker"
import DateConverter from "../date-converter"
import StringToJson from "./string-to-json"


export default async function DataTranscode(data: any) {
    // if (!data || typeof (data) != 'string') return null
    // const jsonData = await StringToJson(data)
    const jsonData = data
    const brand = BrandTicker(jsonData?.carts)

    const dataTranscode = {
        "customerID": jsonData?.buyer?.id ?? "",
        "customer_name": (jsonData?.buyer?.first_name + " " + jsonData?.buyer?.last_name) ?? "",
        "orderNo": jsonData?.id ?? "",
        "referenceNo": jsonData?.payment?.reference_no ?? "",
        "paymentMode": jsonData?.pay_mode ?? "",
        "orderID": jsonData?.id ?? "",
        "orderDate": DateConverter(jsonData?.created_at) ?? "",
        "poNo": jsonData?.po_no ?? "",
        "invoiceNo": jsonData?.payment?.invoice_no ?? "",
        "invoiceDate": DateConverter(jsonData?.payment?.created_at) ?? "",
        "receiptNo": jsonData?.payment?.receipt_no ?? "",
        "salesPerson": jsonData?.seller?.id ?? "",
        "billTo": {
            "name": jsonData?.billing?.name ?? "",
            "contactNo": jsonData?.billing?.phone_full ?? "",
            "email": jsonData?.billing?.email ?? "",
            "address": {
                "street": (jsonData?.billing?.line1 ?? "") + ", " + (jsonData?.billing?.line2 ?? ""),
                "postcode": jsonData?.billing?.postcode ?? "",
                "city": jsonData?.billing?.city ?? "",
                "state": jsonData?.billing?.state ?? "",
                "country": jsonData?.billing?.country?.name ?? ""
            }
        },
        "shipTo": {
            "name": jsonData?.shipping?.name ?? "",
            "contactNo": jsonData?.shipping?.phone_full ?? "",
            "email": jsonData?.shipping?.email ?? "",
            "address": {
                "street": (jsonData?.shipping?.line1 ?? "") + ", " + (jsonData?.shipping?.line2 ?? ""),
                "postcode": jsonData?.shipping?.postcode ?? "",
                "city": jsonData?.shipping?.city ?? "",
                "state": jsonData?.shipping?.state ?? "",
                "country": jsonData?.shipping?.country?.name ?? ""
            }
        },
        "item":
            jsonData?.carts?.map((cart: any) => {
                return {
                    "quantity": cart?.quantity ?? "",
                    "unit": "",
                    "description": (cart?.product_name ?? "") + " - " + (cart?.variation_name ?? ""),
                    "specification": "",
                    "unitBase": (jsonData?.currency?.code ?? "") + " " + (cart?.price ?? ""),
                    "amount": (jsonData?.currency?.code ?? "") + " " + (cart?.amount ?? ""),
                    "brandID": (cart?.item?.main?.brand_id ?? ""),
                    "brand": (cart?.item?.main?.brand?.code ?? "")
                }
            }),
        "brands": brand,
        "totalBeforeSST": (jsonData?.currency?.code ?? "") + " " + (jsonData?.total ?? ""),
        "sst": (jsonData?.currency?.code ?? "") + " " + (jsonData?.tax ?? 0),
        "totalSalesSST": (jsonData?.currency?.code ?? "") + " " + (jsonData?.total ?? ""),
        "remark": (jsonData?.remarks ?? "")
    }

    return dataTranscode
}
