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
                ? 'border-t border-[#e4ddd3] pt-3 font-semibold text-[#2e261c]'
                : 'text-[#7a6b52]'
                }`}
        >
            <dt>{label}</dt>
            <dd className={strong ? 'text-base font-bold text-[#1b4332]' : 'font-medium text-[#5c4f3a]'}>{value}</dd>
        </div>
    );
}