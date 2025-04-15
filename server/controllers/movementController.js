const Movement = require('../models/movementModel');

exports.createMovement = async (req, res) => {
  const { product_id, type, amount } = req.body;
  const created_by = req.user.id;

  if (!product_id || !type || !amount) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const movementId = await Movement.addMovement({ product_id, type, amount, created_by });
    res.status(201).json({ message: 'Movement added', movementId });
  } catch (err) {
    
    console.error('Error creating movement:', err);
    res.status(500).json({ error: 'Failed to create movement' });
  }
  
};

exports.getMovements = async (req, res) => {
  try {
    const movements = await Movement.getAllMovements();
    res.json(movements);
  } catch (err) {
    console.error('Error fetching movements:', err);
    res.status(500).json({ error: 'Failed to fetch movements' });
  }
};
