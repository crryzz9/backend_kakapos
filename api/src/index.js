require('dotenv').config(); 
const express = require('express'); 
const connectDB = require('./config/db'); 
const producteRoutes = require('./routes/producteRoutes');
const usuariRoutes = require('./routes/usuariRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');

const app = express(); 
app.use(express.json()); 

connectDB(); 
 
app.get('/', (req, res) => res.send('API Ecommerce en marxa 🚀')); 

app.use('/api/productes', producteRoutes);
app.use('/api/usuaris', usuariRoutes);
app.use('/api/categories', categoriaRoutes);

// Ruta que no existe
app.use((req, res, next) => next(new AppError(404, 'NOT_FOUND', 'Ruta no trobada')));

// Gestor global de errores: siempre el último
app.use(errorHandler);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Servidor escoltant al port ${PORT}`)); 
