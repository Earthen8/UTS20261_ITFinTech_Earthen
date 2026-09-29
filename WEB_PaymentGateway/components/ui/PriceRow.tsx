interface PriceRowProps {
    label: string;
    value: string;
    strong?: boolean;
}

/** "Label ........ value" row used by the Checkout and Payment summaries. */
export default function PriceRow({ label, value, strong = false }: PriceRowProps) {
    return (
        <div
            className={`flex items-center justify-between text-sm ${strong
                ? 'border-t border-gray-100 pt-3 font-semibold text-gray-900'
                : 'text-gray-500'
                }`}
        >
            <dt>{label}</dt>
            <dd className={strong ? 'text-base font-bold text-gray-900' : 'font-medium text-gray-700'}>{value}</dd>
        </div>
    );
}