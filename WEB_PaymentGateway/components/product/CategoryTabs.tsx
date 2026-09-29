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
            className="flex overflow-x-auto border-b border-gray-200 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                        className={`-mb-px shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition focus:outline-none focus-visible:bg-gray-50 ${isActive
                            ? 'border-indigo-600 text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-800'
                            }`}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}