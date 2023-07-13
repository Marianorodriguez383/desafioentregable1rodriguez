import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const productManager = new ProductManager('products.json');
const PORT = 8080;

app.get('/products', async (req, res) => {
  try {
    const products = productManager.getProducts();
    const limit = req.query.limit;

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = productManager.getProductById(pid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});