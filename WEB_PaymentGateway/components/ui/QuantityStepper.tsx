import { MinusIcon, PlusIcon } from './Icons';

interface QuantityStepperProps {
    value: number;
    productName: string;
    onChange: (next: number) => void;
}

export default function QuantityStepper({ value, productName, onChange }: QuantityStepperProps) {
    const button =
        'flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500';

    return (
        <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-300 bg-white">
            <button
                type="button"
                className={button}
                aria-label={value <= 1 ? `Remove ${productName}` : `Decrease quantity of ${productName}`}
                onClick={() => onChange(value - 1)}
            >
                <MinusIcon className="h-4 w-4" />
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
                <PlusIcon className="h-4 w-4" />
            </button>
        </div>
    );
}