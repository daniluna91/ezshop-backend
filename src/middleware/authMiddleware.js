const jwt = require('jsonwebtoken');
// clave jwt
const JWT_SECRET = '9023Newton.';

/**
 * middleware para verificar si el token jwt es valido.
 * esta en const para que se exporte
 */
const verifyToken = async (req, res, next) => {
  // el const para que exporte
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
 * para verificar el admin
 * esta en const para que se exporte
 */
const isAdmin = (req, res, next) => {
  // el const
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'AH AH AH, no has dicho la palabra mágica!' });
  }
};

// exportacion
module.exports = { verifyToken, isAdmin };
