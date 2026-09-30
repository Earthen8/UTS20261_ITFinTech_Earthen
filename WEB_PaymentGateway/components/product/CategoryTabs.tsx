import { CATEGORIES, type Category } from '../../lib/products';

interface CategoryTabsProps {
    active: Category;
    onChange: (category: Category) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
    return (
        <div
            role="tablist"
            aria-label="Product categories"
            className="flex overflow-x-auto border-b border-[#e4ddd3] px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
            {CATEGORIES.map((category) => {
                const isActive = category === active;
                return (
                    <button
                        key={category}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(category)}
                        className={`-mb-px shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:bg-[#f0ebe4] ${isActive
                            ? 'border-[#2d6a4f] text-[#1b4332] font-semibold'
                            : 'border-transparent text-[#a0937f] hover:text-[#5c4f3a]'
                            }`}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}