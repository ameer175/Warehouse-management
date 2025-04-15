const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const {verifyToken} = require('./middleware/auth');
const productRoutes = require('./routes/productRoutes');
//const movementRoutes = require('./routes/movementRoutes');
//const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const movementRoutes = require('./routes/movementRoutes');
const userRoutes = require('./routes/userRoutes');
const statsRoutes = require('./routes/statsRoutes');





const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products',verifyToken, productRoutes); // הגנה
app.use('/api/movements', movementRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);


//app.use('/api/movements', movementRoutes);
//app.use('/api/users', userRoutes); // לצורך התחברות בהמשך

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
