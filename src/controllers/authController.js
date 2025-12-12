// EZSHOP/backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// esta clave debe ser la misma a la usada en authMiddleware.js
const JWT_SECRET = '9023Newton.';
const SALT_ROUNDS = 10;

// ---------------------------------------------------------------------

// --- REGISTRO DE USUARIO ---
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Verificar si el usuario ya existe
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    // 2. Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 3. Crear nuevo usuario y asignar rol por defecto 'user'
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'user',
    });

    // 4. Respuesta de éxito
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    // Retorna 500 Internal Server Error (si falla la DB, etc.)
    res.status(500).json({ message: 'Error en el registro.', error: error.message });
  }
};

// --- INICIO DE SESIÓN ---
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Encontrar usuario por email (incluyendo la contraseña hasheada)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // 2. Comparar la contraseña ingresada con el hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // 3. Generar el JWT (Payload: id y role son CLAVE para la seguridad)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET, // ⬅️ Usamos la clave fija
      { expiresIn: '1h' }
    );

    // 4. Respuesta de éxito con el token
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión.', error: error.message });
  }
};

module.exports = { register, login };
