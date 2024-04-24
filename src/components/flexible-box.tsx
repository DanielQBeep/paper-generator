export default function FlexibleBox({
    children, id, title, disableBottomMargin
}: Readonly<{
    children?: React.ReactNode, id?: string, title?: string, disableBottomMargin?: boolean
}>) {
    return <div id={id} className={`${disableBottomMargin ? "mb-4" : "mb-14"}`}>
        <div className={`font-semibold ${title ? "leading-6 mb-2 mt-2" : "hidden"}`}>{title}</div>
        <div className=" text-xs outline outline-1 outline-teal-600 px-2 pt-3 h-full">
            {children}
        </div>
    </div>
}