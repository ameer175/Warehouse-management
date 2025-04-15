const db = require('../config/db');

exports.getMonthlyConsumption = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        DATE_FORMAT(sm.created_at, '%Y-%m') AS month,
        p.name,
        SUM(sm.amount) AS total_out
      FROM stock_movements sm
      JOIN products p ON sm.product_id = p.id
      WHERE sm.type = 'out'
      GROUP BY month, p.name
      ORDER BY month DESC, total_out DESC;
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching monthly consumption:', err);
    res.status(500).json({ error: 'Failed to fetch monthly consumption' });
  }
};


exports.getConsumptionStats = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        p.name, 
        DATE(sm.created_at) AS date, 
        SUM(sm.amount) AS total_out
      FROM stock_movements sm
      JOIN products p ON sm.product_id = p.id
      WHERE sm.type = 'out'
      GROUP BY p.name, DATE(sm.created_at)
      ORDER BY date
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch consumption stats' });
  }
};

exports.getTopProducts = async (req, res) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT p.name, SUM(sm.amount) AS total_out
        FROM stock_movements sm
        JOIN products p ON sm.product_id = p.id
        WHERE sm.type = 'out'
        GROUP BY p.name
        ORDER BY total_out DESC
        LIMIT 5
      `);
      res.json(rows);
    } catch (err) {
      console.error('Error fetching top products:', err);
      res.status(500).json({ error: 'Failed to fetch top products' });
    }
  };
  
