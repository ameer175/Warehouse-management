const db = require('../config/db');

// Get all products
async function getAllProducts() {
  const sql = 'SELECT * FROM products';
  const [rows] = await db.promise().query(sql);
  return rows;
}

// Get product by ID
async function getProductById(id) {
  const sql = 'SELECT * FROM products WHERE id = ?';
  const [rows] = await db.promise().query(sql, [id]);
  return rows;
}

// Create new product
async function createProduct(product) {
  const sql = 'INSERT INTO products (name, category, quantity, min_quantity, created_by) VALUES (?, ?, ?, ?, ?)';
  try {
    const [result] = await db.promise().query(sql, [
      product.name,
      product.category,
      product.quantity,
      product.min_quantity,
      product.created_by
    ]);
    return result.insertId;
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw new Error('Product with this name already exists');
    }
    throw err;
  }
}


// Update existing product
async function updateProduct(id, data) {
  const { name, category, quantity, min_quantity } = data;
  const sql = `
    UPDATE products
    SET name = ?, category = ?, quantity = ?, min_quantity = ?
    WHERE id = ?
  `;
  await db.promise().query(sql, [name, category, quantity, min_quantity, id]);
}

// Delete product
async function deleteProduct(id) {
  const sql = 'DELETE FROM products WHERE id = ?';
  await db.promise().query(sql, [id]);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
