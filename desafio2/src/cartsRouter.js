import express from 'express';
import fs from 'fs';

const cartsRouter = express.Router();

// Ruta para obtener los productos de un carrito por su id
cartsRouter.get('/:cid', (req, res) => {
  try {
    const cid = req.params.cid;
    const cartData = fs.readFileSync(`cart_${cid}.json`, 'utf-8');
    const cart = JSON.parse(cartData);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Ruta para agregar un producto al carrito
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1; 

    // Código para agregar el producto al carrito omitido 

    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

export default cartsRouter;
