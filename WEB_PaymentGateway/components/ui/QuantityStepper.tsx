import { MinusIcon, PlusIcon } from './Icons';

interface QuantityStepperProps {
    value: number;
    productName: string;
    onChange: (next: number) => void;
}

export default function QuantityStepper({ value, productName, onChange }: QuantityStepperProps) {
    const button =
        'flex h-8 w-8 items-center justify-center text-gray-500 transition hover:bg-violet-50 hover:text-violet-700 active:bg-violet-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400';

    return (
        <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
            <button
                type="button"
                className={button}
                aria-label={value <= 1 ? `Remove ${productName}` : `Decrease quantity of ${productName}`}
                onClick={() => onChange(value - 1)}
            >
                <MinusIcon className="h-3.5 w-3.5" />
            </button>
            <span
                className="w-9 select-none text-center text-sm font-semibold text-gray-800"
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