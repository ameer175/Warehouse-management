const User = require('../models/userModel');

// שליפה
exports.getAllUsers = async (req, res) => {
    
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// עדכון תפקיד
exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['admin', 'worker'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const updated = await User.updateUserRole(id, role);
    if (updated === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    console.error('Error updating role:', err);
    res.status(500).json({ error: 'Failed to update role' });
  }
};
