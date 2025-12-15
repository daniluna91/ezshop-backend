const createProduct = async (req, res) => {
  // verificar si la peticion exixte
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: 'Se requiere el cuerpo de la petición para crear el producto.' });
  }

  // logica de simulacion

  // exito (201 Created)
  return res.status(201).json({
    message: 'Producto creado exitosamente (Simulación). El token y el rol fueron verificados.',
    data_recibida: req.body,
    usuario_rol: req.user.role,
  });
};

module.exports = { createProduct };
