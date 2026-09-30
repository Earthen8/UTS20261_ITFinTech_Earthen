import { MinusIcon, PlusIcon } from './Icons';

interface QuantityStepperProps {
    value: number;
    productName: string;
    onChange: (next: number) => void;
}

export default function QuantityStepper({ value, productName, onChange }: QuantityStepperProps) {
    const button =
        'flex h-8 w-8 items-center justify-center text-[#7a6b52] transition hover:bg-[#ecf5ee] hover:text-[#2d6a4f] active:bg-[#d4ead8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]';

    return (
        <div className="inline-flex items-center overflow-hidden rounded-xl border border-[#e4ddd3] bg-white">
            <button
                type="button"
                className={button}
                aria-label={value <= 1 ? `Remove ${productName}` : `Decrease quantity of ${productName}`}
                onClick={() => onChange(value - 1)}
            >
                <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span
                className="w-9 select-none text-center text-sm font-semibold text-[#2e261c]"
                aria-live="polite"
                aria-label={`Quantity of ${productName}: ${value}`}
            >
                {value}
            </span>
            <button
                type="button"
                className={button}
                aria-label={`Increase quantity of ${productName}`}
                onClick={() => onChange(value + 1)}
            >
                <PlusIcon className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}