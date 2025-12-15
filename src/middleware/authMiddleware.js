// EZSHOP/backend/middleware/authMiddleware.js (VERSIÓN FINAL Y FUNCIONAL)

const jwt = require('jsonwebtoken');
// ⚠️ Clave Secreta Fija
const JWT_SECRET = '9023Newton.';

/**
 * 1. Middleware para verificar si el token JWT es válido.
 * Definida con 'const' para una exportación limpia.
 */
const verifyToken = async (req, res, next) => {
  // ⬅️ Usamos 'const' aquí
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Acceso denegado. Se requiere autenticación.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // ⬅️ Usa JWT_SECRET
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Token inválido o expirado. Acceso no autorizado.',
    });
  }
};

/**
 * 2. Middleware de Autorización: Verifica si el rol es 'admin'.
 * Definida con 'const' para una exportación limpia.
 */
const isAdmin = (req, res, next) => {
  // ⬅️ Usamos 'const' aquí
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'AH AH AH, no has dicho la palabra mágica!' });
  }
};

// 3. 🚨 CORRECCIÓN CLAVE DE EXPORTACIÓN: Usamos el shorthand de JS
// Ahora que están definidas con 'const', esta sintaxis es correcta y robusta.
module.exports = { verifyToken, isAdmin };
