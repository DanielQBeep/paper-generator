import DateConverter from "../date-converter"
import StringToJson from "./string-to-json"


export default async function ReceiptData(data: any) {
    if (!data || typeof (data) != 'string') return null
    const jsonData = await StringToJson(data)

    const dataTranscode = {
        "orderNo": jsonData?.order_id,
        "referenceNo": jsonData?.reference_no,
        "paymentMode": jsonData?.order?.pay_mode,
        "orderDate": DateConverter(jsonData?.order?.created_at),
        "billTo": {
            "name": jsonData?.billing?.name,
            "contactNo": jsonData?.billing?.phone_full,
            "email": jsonData?.billing?.email,
            "address": {
                "street": jsonData?.billing?.line1 + ", " + jsonData?.billing?.line2,
                "postcode": jsonData?.billing?.postcode,
                "city": jsonData?.billing?.city,
                "state": jsonData?.billing?.state,
                "country": jsonData?.billing?.country?.name
            }
        },
        "shipTo": {
            "name": jsonData?.shipping?.name,
            "contactNo": jsonData?.shipping?.phone_full,
            "email": jsonData?.shipping?.email,
            "address": {
                "street": jsonData?.shipping?.line1 + ", " + jsonData?.shipping?.line2,
                "postcode": jsonData?.shipping?.postcode,
                "city": jsonData?.shipping?.city,
                "state": jsonData?.shipping?.state,
                "country": jsonData?.shipping?.country?.name
            }
        },
        "item":
            jsonData?.carts?.map((cart: any) => {
                return {
                    "quantity": cart?.quantity,
                    "unit": "",
                    "description": cart?.item?.title + " - " + cart?.item?.subtitle,
                    "unitBase": jsonData?.currency?.code + " " + cart?.price,
                    "amount": jsonData?.currency?.code + " " + cart?.amount
                }
            }),
        "totalBeforeSST": jsonData?.currency?.code + " " + jsonData?.order?.total,
        "sst": jsonData?.currency?.code + " " + (jsonData?.order?.tax ?? 0),
        "totalSalesSST": jsonData?.currency?.code + " " + jsonData?.order?.total,
        "remark": null
    }

    return dataTranscode
}
