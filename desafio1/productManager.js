class ProductManager {
    constructor() {
      this.products = [];
      this.productId = 1;
    }
  
    addProduct(product) {
      // Campos obligatorios
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log("Error: Todos los campos son obligatorios");
        return;
      }
  
      // Campo "code" no esté repetido
      if (this.products.some(p => p.code === product.code)) {
        console.log("Error: El código ya existee");
        return;
      }
  
      // Agrega el producto al arreglo con un id autoincrementable
      product.id = this.productId;
      this.products.push(product);
      this.productId++;
  
      console.log('Producto agregado correctamente');
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
  
      if (product) {
        return product;
      } else {
        console.log("Not found");
      }
    }
  }
  
  // Ejemplo
  const productManager = new ProductManager();
  
  // Agregar productos
  productManager.addProduct({
    title: 'Producto A',
    description: 'Descripción del producto A',
    price: 15000,
    thumbnail: 'ruth/productoA.jpg',
    code: '001',
    stock: 5
  });
  
  productManager.addProduct({
    title: 'Producto B',
    description: 'Descripción del producto B',
    price: 1000,
    thumbnail: 'ruth/imagenB.jpg',
    code: '002',
    stock: 3
  });
  
  // Obtener todos los productos
  const allProducts = productManager.getProducts();
  console.log(allProducts);
  
  // Obtener producto por id
  const productById = productManager.getProductById(1);
  console.log(productById);
  
  const nonExistentProduct = productManager.getProductById(3); // Producto no existente