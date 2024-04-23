const tickSVG = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
    <path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="2" d="M21 6L9 18 4 13"></path>
</svg>

const brands = [
    { name: 'Nexgen Biopharma Ltd', type: 'MF3' },
    { name: 'Stellar Biomolecular Innovations Inc.', type: 'MF+/LAB-RMS' }
]

const tick = (brands: any, i: number) => {
    if (i === 0) return brands?.psc
    if (i === 1 || i === 3) return brands?.rms ?? brands?.mf3
    if (i === 2) return brands?.key("mf+")
    return true
}

export default function TickBoxItem({ props }: { props?: { orderDate: string, brands: { psc: boolean, rms: boolean, mf3: boolean, "mf+": boolean } } }) {
    return <div className="grid grid-cols-3 gap-2">
        <div className="grid grid-cols-2 col-span-2">
            {
                brands.map((brand, i) => (
                    <div className="flex flex-row" key={i}>
                        <div className="min-w-4 max-w-4 min-h-4 max-h-4 outline outline-1"> {tick(props?.brands, i) ? tickSVG : ""}</div>
                        <div className="text-xs ml-2">{brand?.name} ({brand?.type})</div>
                    </div>
                ))
            }
        </div>
        <div className="flex flex-row">
            <div className="text-xs"> Date Generated:</div>
            <div className="text-xs ml-2">{props?.orderDate}</div>
        </div>
    </div>
}