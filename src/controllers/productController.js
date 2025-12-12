// EZSHOP/backend/controllers/productController.js

const createProduct = async (req, res) => {
  // 1. Verificar si el cuerpo de la petición existe (esto evita el 400 por falta de datos)
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: 'Se requiere el cuerpo de la petición para crear el producto.' });
  }

  // 2. Lógica de Simulación: Asumimos que la autenticación (verifyToken) y la autorización (checkRole) pasaron.
  // Aquí es donde normalmente iría la interacción con Mongoose:
  // const newProduct = await Product.create(req.body);

  // 3. Respuesta de éxito (201 Created)
  return res.status(201).json({
    message: 'Producto creado exitosamente (Simulación). El token y el rol fueron verificados.',
    data_recibida: req.body,
    // Opcional: Mostrar quién hizo la petición (el rol)
    usuario_rol: req.user.role, // req.user viene del verifyToken, si lo incluyes en el middleware
  });
};

module.exports = { createProduct };
