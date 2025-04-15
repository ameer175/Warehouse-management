const Product = require('../models/productModel');

// קבלת כל המוצרים
getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// קבלת מוצר לפי מזהה
getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await Product.getProductById(productId);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// יצירת מוצר חדש
createProduct = async (req, res) => {
  const { name, category, quantity, min_quantity, created_by } = req.body;

  // ולידציה בסיסית
  if (!name || !category || quantity == null || min_quantity == null || !created_by) {
    return res.status(400).json({
      error: 'Missing or invalid required fields: name, category, quantity, min_quantity, created_by'
    });
  }

  try {
    const newProductId = await Product.createProduct(req.body);
    res.status(201).json({
      message: 'Product created successfully',
      productId: newProductId
    });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// עדכון מוצר קיים
updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    await Product.updateProduct(productId, updatedData);
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// מחיקת מוצר
deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.deleteProduct(productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  getProductById

};
