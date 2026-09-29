import connectToDatabase from '../../lib/mongodb';
import Product from '../../models/Product';
import { initialProducts } from './seed';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const { category, search } = req.query;

      // Auto-seed jika database masih kosong
      const count = await Product.countDocuments();
      if (count === 0) {
        await Product.insertMany(initialProducts);
      }

      const query = {};

      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      if (search && search.trim() !== '') {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [{ name: searchRegex }, { description: searchRegex }];
      }

      const products = await Product.find(query).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      console.error('[Get Products Error]:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch products',
        details: error.message,
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, category, price, description, image, stock } = req.body;

      if (!name || !category || price === undefined) {
        return res.status(400).json({
          success: false,
          error: 'Name, category, and price are required fields',
        });
      }

      const newProduct = await Product.create({
        name,
        category,
        price: Number(price),
        description: description || '',
        image: image || '',
        stock: stock !== undefined ? Number(stock) : 50,
      });

      return res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (error) {
      console.error('[Create Product Error]:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to create product',
        details: error.message,
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
