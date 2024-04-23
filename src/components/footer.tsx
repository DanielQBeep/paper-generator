import GradientHighlight from './gradient-highlight'

export default function Footer({ props }: { props?: { tnc?: String[] } }) {
    return (
        <>
            <div className='min-w-full min-h-28 mt-4 bg-teal-500/10 p-5'>
                <div className=''>
                    <GradientHighlight props={{ title: "General Term & Condition" }} />
                    <div className='mt-2 mx-2 '>
                        {
                            props?.tnc?.map((t, i) => (
                                <div key={i} className="text-3xs/4">{i + 1}. {t}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}