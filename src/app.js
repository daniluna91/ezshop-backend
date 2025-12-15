const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');

// rutas de andmin y autorizacion
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

dotenv.config();

const app = express();

// middlewares de express
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// rutas api conexion
app.use('/api/auth', authRoutes); // Tus rutas de login/registro (YA EXISTE)

// conexion rutas admin
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
  // llama a la db
  connectDB();
});
