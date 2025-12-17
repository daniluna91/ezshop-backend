const checkRole = (roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      message: 'Error de autenticación: la información del usuario no está disponible.',
    });
  }

  const userRole = req.user.role;
  //if para verificar si el usuario tiene el rol correcto
  if (!roles.includes(userRole)) {
    return res.status(403).json({
      message: 'Acceso denegado. Permiso insuficiente.',
    });
  }

  next();
};

module.exports = { checkRole };
