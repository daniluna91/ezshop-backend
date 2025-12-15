const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// esta clave debe ser la misma a la usada en authMiddleware.js
const JWT_SECRET = '9023Newton.';
const SALT_ROUNDS = 10;


// register
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1 verifica si existe
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    // 2 hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 3 crear user y asignar rol 'user'
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'user',
    });

    // 4 estamos in
    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    // si falla la db sale error 500
    res.status(500).json({ message: 'Error en el registro.', error: error.message });
  }
};

// inicio de sesion
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1 encontrar usuario por email 
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // 2 comparar usuarios por el hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // 3 generar el JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET, // ⬅️ Usamos la clave fija
      { expiresIn: '1h' }
    );

    // 4 respuesta de exito con el token
    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión.', error: error.message });
  }
};

module.exports = { register, login };
