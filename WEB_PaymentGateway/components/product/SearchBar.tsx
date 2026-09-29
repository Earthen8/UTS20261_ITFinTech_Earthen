import { SearchIcon } from '../ui/Icons';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative">
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search"
                aria-label="Search products"
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-4 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <SearchIcon className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
        </div>
    );
}