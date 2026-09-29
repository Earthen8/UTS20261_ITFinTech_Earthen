interface PriceRowProps {
    label: string;
    value: string;
    strong?: boolean;
}

/** "Label ........ value" row used by the Checkout and Payment summaries. */
export default function PriceRow({ label, value, strong = false }: PriceRowProps) {
    return (
        <div
            className={`flex items-center justify-between text-sm ${strong ? 'pt-1 font-semibold text-gray-900' : 'text-gray-600'
                }`
            }
        >
            <dt>{label} </dt>
            < dd className={strong ? 'text-base' : 'font-medium text-gray-800'} > {value} </dd>
        </div>
    );
}