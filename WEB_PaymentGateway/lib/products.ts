export const CATEGORIES = ['All', 'Drinks', 'Snacks', 'Bundles'] as const;

export type Category = (typeof CATEGORIES)[number];
export type ProductCategory = Exclude<Category, 'All'>;

export interface Product {
    id: string;
    name: string;
    price: number; // in IDR
    description: string;
    category: ProductCategory;
    emoji: string; // placeholder visual until real images exist
}

// Static catalogue. Replace with data fetched from the Product collection
// (MongoDB) once the API exists; keep the shape of `Product` the same.
export const PRODUCTS: Product[] = [
    { id: 'drk-001', name: 'Iced Latte', price: 28000, description: 'Espresso, fresh milk, and ice.', category: 'Drinks', emoji: '🥛' },
    { id: 'drk-002', name: 'Matcha Cloud', price: 32000, description: 'Ceremonial matcha with sweet cream.', category: 'Drinks', emoji: '🍵' },
    { id: 'drk-003', name: 'Lemon Iced Tea', price: 18000, description: 'Black tea with fresh lemon.', category: 'Drinks', emoji: '🍋' },
    { id: 'snk-001', name: 'Butter Croissant', price: 22000, description: 'Flaky, baked fresh every morning.', category: 'Snacks', emoji: '🥐' },
    { id: 'snk-002', name: 'Truffle Fries', price: 30000, description: 'Crispy fries with truffle salt.', category: 'Snacks', emoji: '🍟' },
    { id: 'snk-003', name: 'Choco Cookies', price: 15000, description: 'Three chewy dark chocolate cookies.', category: 'Snacks', emoji: '🍪' },
    { id: 'bnd-001', name: 'Coffee Break Combo', price: 45000, description: 'Iced Latte + Butter Croissant.', category: 'Bundles', emoji: '☕' },
    { id: 'bnd-002', name: 'Sharing Snack Box', price: 60000, description: 'Fries, cookies, and two lemon teas.', category: 'Bundles', emoji: '🎁' },
    { id: 'bnd-003', name: 'Matcha Duo', price: 58000, description: 'Two Matcha Clouds at a bundle price.', category: 'Bundles', emoji: '🍃' },
];

export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find((p) => p.id === id);
}