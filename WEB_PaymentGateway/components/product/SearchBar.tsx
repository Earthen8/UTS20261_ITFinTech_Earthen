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
                placeholder="Search products…"
                aria-label="Search products"
                className="w-full rounded-xl border border-[#e4ddd3] bg-[#f0ebe4]/50 py-2.5 pl-4 pr-11 text-sm text-[#2e261c] placeholder-[#a0937f] outline-none transition focus:border-[#2d6a4f] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f]/20"
            />
            <SearchIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#a0937f]" />
        </div>
    );
}