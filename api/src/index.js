require('dotenv').config(); 
const express = require('express'); 
const connectDB = require('./config/db'); 
const producteRoutes = require('./routes/producteRoutes');
const usuariRoutes = require('./routes/usuariRoutes');

const app = express(); 
app.use(express.json()); 

connectDB(); 
 
app.get('/', (req, res) => res.send('API Ecommerce en marxa 🚀')); 
app.use('/api/productes', producteRoutes);
app.use('/api/usuaris', usuariRoutes);
 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`)); 
