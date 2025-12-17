const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('ERROR: La variable de entorno MONGO_URI no está definida en .env');
      process.exit(1);
    }
    // await para esperar la respuesta y mongoose.connect para conectar a la base de datos
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexión exitosa a MongoDB.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    // termina el proceso si no podemos conectarnos a la base de datos
    process.exit(1);
  }
};

module.exports = connectDB;
