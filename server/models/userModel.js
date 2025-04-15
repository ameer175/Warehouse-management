const db = require('../config/db');

// שליפת כל המשתמשים
async function getAllUsers() {
  const [rows] = await db.promise().query(
    'SELECT id, username, role, created_at FROM users ORDER BY created_at DESC'
  );
  return rows;
}

// עדכון תפקיד של משתמש
async function updateUserRole(id, role) {
  const [result] = await db.promise().query(
    'UPDATE users SET role = ? WHERE id = ?',
    [role, id]
  );
  return result.affectedRows;
}

module.exports = {
  getAllUsers,
  updateUserRole
};
