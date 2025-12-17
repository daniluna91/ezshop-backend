const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');

// rutas de andmin y autorizacion
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

dotenv.config();

const app = express();

// middlewares de express, app.use significa que se va a usar el middleware y su funcion es la de parsear el body de la peticion
//parsear es convertir el body de la peticion en un objeto javascript
//urlencoded es para parsear los datos de un formulario
//extended: true permite que el middleware pueda parsear objetos anidados
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  // cors es para permitir peticiones de diferentes origenes y conecta el frontend con el backend
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    //origin es el origen de la peticion, methods es el metodo de la peticion, credentials es para enviar cookies, allowedHeaders es para enviar headers
  })
);

// rutas api conexion
app.use('/api/auth', authRoutes); //rutas de login/registro (YA EXISTE)

// conexion rutas admin
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5000; // || se puede usar para asignar un valor por defecto

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
  // llama a la db
  connectDB();
});
