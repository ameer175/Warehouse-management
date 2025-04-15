const db = require('../config/db');

async function addMovement({ product_id, type, amount, created_by }) {
  const conn = db.promise();

  const [product] = await db.promise().query('SELECT quantity FROM products WHERE id = ?', [product_id]);
  if (type === 'out' && product[0].quantity < amount) {
    return res.status(400).json({ error: 'Insufficient stock' });
  }

  // הוספת התנועה
  const [result] = await conn.query(
    'INSERT INTO stock_movements (product_id, type, amount, created_by) VALUES (?, ?, ?, ?)',
    [product_id, type, amount, created_by]
  );

  // עדכון כמות המוצר
  const operator = type === 'in' ? '+' : '-';
  await conn.query(
    `UPDATE products SET quantity = quantity ${operator} ? WHERE id = ?`,
    [amount, product_id]
  );

  return result.insertId;
}

async function getAllMovements() {
  const conn = db.promise();
  const [rows] = await conn.query(`
    SELECT m.*, p.name AS product_name, u.username AS created_by_user
    FROM stock_movements m
    JOIN products p ON m.product_id = p.id
    JOIN users u ON m.created_by = u.id
    ORDER BY m.created_at DESC
  `);
  return rows;
}

module.exports = { addMovement, getAllMovements };
