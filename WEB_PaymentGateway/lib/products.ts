export const CATEGORIES = ['All', 'Drinks', 'Snacks', 'Bundles'] as const;

export type Category = (typeof CATEGORIES)[number];
export type ProductCategory = Exclude<Category, 'All'>;

export interface Product {
    id: string;
    name: string;
    price: number; // in IDR
    description: string;
    category: ProductCategory;
    emoji: string; // fallback visual
    imageUrl: string; // real product image
}

// Static catalogue. Replace with data fetched from the Product collection
// (MongoDB) once the API exists; keep the shape of `Product` the same.
export const PRODUCTS: Product[] = [
    {
        id: 'drk-001', name: 'Iced Latte', price: 28000,
        description: 'Espresso, fresh milk, and ice.',
        category: 'Drinks', emoji: '🥛',
        imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop&q=80',
    },
    {
        id: 'drk-002', name: 'Matcha Cloud', price: 32000,
        description: 'Ceremonial matcha with sweet cream.',
        category: 'Drinks', emoji: '🍵',
        imageUrl: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop&q=80',
    },
    {
        id: 'drk-003', name: 'Lemon Iced Tea', price: 18000,
        description: 'Black tea with fresh lemon.',
        category: 'Drinks', emoji: '🍋',
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&q=80',
    },
    {
        id: 'snk-001', name: 'Butter Croissant', price: 22000,
        description: 'Flaky, baked fresh every morning.',
        category: 'Snacks', emoji: '🥐',
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop&q=80',
    },
    {
        id: 'snk-002', name: 'Truffle Fries', price: 30000,
        description: 'Crispy fries with truffle salt.',
        category: 'Snacks', emoji: '🍟',
        imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop&q=80',
    },
    {
        id: 'snk-003', name: 'Choco Cookies', price: 15000,
        description: 'Three chewy dark chocolate cookies.',
        category: 'Snacks', emoji: '🍪',
        imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop&q=80',
    },
    {
        id: 'bnd-001', name: 'Coffee Break Combo', price: 45000,
        description: 'Iced Latte + Butter Croissant.',
        category: 'Bundles', emoji: '☕',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&q=80',
    },
    {
        id: 'bnd-002', name: 'Sharing Snack Box', price: 60000,
        description: 'Fries, cookies, and two lemon teas.',
        category: 'Bundles', emoji: '🎁',
        imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&h=400&fit=crop&q=80',
    },
    {
        id: 'bnd-003', name: 'Matcha Duo', price: 58000,
        description: 'Two Matcha Clouds at a bundle price.',
        category: 'Bundles', emoji: '🍃',
        imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=400&fit=crop&q=80',
    },
];

export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find((p) => p.id === id);
}