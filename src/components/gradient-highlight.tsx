export default function GradientHighlight({ props, className }: { className?: string, props?: { title: string, disableGradient?: Boolean } }) {
    return (
        <>
            {/* <div className={`${!props?.disableGradient ? "bg-gradient-to-r from-teal-200 from-10% via-transparent via-40%" : ""} pl-2 text-xs py-0.5 border-l-2 border-teal-500 text-gray-500`}> */}
            <div className={`${!props?.disableGradient ? "bg-gradient-to-r from-teal-200/40 from-20% via-white/5 via-30% pr-4" : ""} pl-2 text-xs py-0.5 border-l-2 border-teal-500 text-gray-600 ${className}`}>
                {props?.title}
            </div>
        </>
    )
}