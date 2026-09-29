import connectToDatabase from '../../lib/mongodb';
import Product from '../../models/Product';

export const initialProducts = [
  {
    name: 'Iced Matcha Latte',
    category: 'Drinks',
    price: 32000,
    description: 'Fresh ceremonial Japanese matcha blended with creamy milk and light syrup.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&auto=format&fit=crop&q=60',
    stock: 45,
  },
  {
    name: 'Cold Brew Signature Coffee',
    category: 'Drinks',
    price: 28000,
    description: 'Slow-steeped Arabica coffee beans for 18 hours, giving a smooth and bold taste.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=60',
    stock: 50,
  },
  {
    name: 'Sparkling Berry Lemonade',
    category: 'Drinks',
    price: 26000,
    description: 'Refreshing sparkling water infused with wild berries and freshly squeezed lemon.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60',
    stock: 40,
  },
  {
    name: 'Truffle Artisan Potato Chips',
    category: 'Snacks',
    price: 24000,
    description: 'Crispy kettle-cooked potato crisps glazed with aromatic Italian black truffle oil.',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60',
    stock: 60,
  },
  {
    name: 'Dark Chocolate Chunk Cookie',
    category: 'Snacks',
    price: 18000,
    description: 'Soft-baked artisanal cookie loaded with 70% Belgian dark chocolate chunks.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60',
    stock: 35,
  },
  {
    name: 'Roasted Honey Almonds',
    category: 'Snacks',
    price: 22000,
    description: 'Premium California almonds gently roasted with organic honey and sea salt.',
    image: 'https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?w=500&auto=format&fit=crop&q=60',
    stock: 55,
  },
  {
    name: 'Movie Night Snack Bundle',
    category: 'Bundles',
    price: 68000,
    description: 'Bundle includes: 2x Iced Drinks of your choice + 1x Truffle Chips + 1x Chocolate Cookie.',
    image: 'https://images.unsplash.com/photo-1505253758473-96b46d5f69c6?w=500&auto=format&fit=crop&q=60',
    stock: 25,
  },
  {
    name: 'Afternoon Tea Break Bundle',
    category: 'Bundles',
    price: 55000,
    description: 'Bundle includes: 1x Iced Matcha Latte + 1x Cold Brew Coffee + 2x Chocolate Cookies.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=60',
    stock: 20,
  },
];

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    await connectToDatabase();

    const { force } = req.query;

    if (force === 'true') {
      await Product.deleteMany({});
    } else {
      const existingCount = await Product.countDocuments();
      if (existingCount > 0) {
        const products = await Product.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
          success: true,
          message: 'Database already seeded with products',
          count: existingCount,
          data: products,
        });
      }
    }

    const insertedProducts = await Product.insertMany(initialProducts);

    return res.status(201).json({
      success: true,
      message: 'Successfully seeded database with initial products',
      count: insertedProducts.length,
      data: insertedProducts,
    });
  } catch (error) {
    console.error('[Seed Error]:', error);
    return res.status(500).json({
      error: 'Failed to seed database',
      details: error.message,
    });
  }
}
