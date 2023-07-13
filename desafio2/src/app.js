import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const productManager = new ProductManager('products.json');
const PORT = 8080;

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

app.get('/products/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = productManager.getProductById(pid);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});