import express from 'express';
import cartsRouter from './cartsRouter.js';
import ProductManager from './productManager.js';

const app = express();
const PORT = 8080;

app.use(express.json());

const productManager = new ProductManager('products.json');

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
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

// Ruta para obtener un producto por su id
app.get('/api/products/:pid', async (req, res) => {
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

// Ruta para agregar un nuevo producto
app.post('/api/products', async (req, res) => {
  try {
    const product = req.body;
    productManager.addProduct(product);
    res.json({ message: 'Producto agregado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un producto por su id
app.put('/api/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const updatedFields = req.body;
    productManager.updateProduct(pid, updatedFields);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un producto por su id
app.delete('/api/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    productManager.deleteProduct(pid);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Montar el enrutador de carritos en la ruta /api/carts
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
