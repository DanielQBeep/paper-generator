import Image from 'next/image'

export default function Header({ props }: { props?: { logo?: String, logoAlt?: String, type: String, createdAt?: any, version?: any } }) {
    const date = props?.createdAt ? new Date(props?.createdAt).toUTCString() : null

    return (
        <>
            <div className='min-w-full min-h-28 absolute top-0 left-0 bg-gradient-to-r from-teal-100/30 from-20% via-white/5 via-30%'>
                {/* <div className='min-w-full min-h-28 absolute top-0 left-0 bg-teal-100/30'> */}
                <div className='flex justify-between items-center mx-12'>
                    <Image
                        src={(props?.logo ?? "/images/ewg-logo.png") as string}
                        alt={(props?.logoAlt ?? "EW Global Logo") as string}
                        width={300}
                        height={200}
                        className='mt-8'
                    />
                    <span className=" text-teal-600 text-xl mt-8">{props?.type}</span>
                    <span className=" absolute right-12 top-10 text-3xs mt-8 text-black/50">{date ? date : null}{props?.createdAt ? " (v" + props?.version + ")" : null}</span>
                </div>
            </div>
            <div className='mt-32'></div>
        </>
    )
}