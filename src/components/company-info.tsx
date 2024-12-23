export default function CompanyInfo({ props }: { props?: { companyName: string, companyRegNo: string, companyAddress: { street: string, postcode: string, city: string, state: string, country: string }, tel: string, fax: string } }) {
    return (
        <div>
            <div className=" font-bold py-2">{props?.companyName} {props?.companyRegNo ? `(${props.companyRegNo})` : ''}</div>
            <div className="grid grid-cols-4 py-2 text-black/70">
                <div className="text-sm leading-tight col-span-2">
                    {props?.companyAddress.street}, {props?.companyAddress.postcode} {props?.companyAddress.city}, {props?.companyAddress.state}, {props?.companyAddress.country}
                </div>
                <div className=" col-span-1" />
                <div className="text-sm -ml-4">
                    <div className="flex justify-between">
                        <div className="font-semibold mr-2">Tel:</div>
                        <div className="ml-2">{props?.tel}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="font-semibold">Fax:</div>
                        <div className="ml-2">{props?.fax}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}