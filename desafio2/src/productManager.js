import fs from 'fs';

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productId = 1;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.productId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    } catch (error) {
      // Si el archivo no existe o hay un error, se crea un nuevo archivo vacío
      this.products = [];
      fs.writeFileSync(this.path, '[]');
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  addProduct(product) {
    this.loadProducts();

    // Campos obligatorios
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log('Error: Todos los campos son obligatorios');
      return;
    }

    // Campo "code" no esté repetido
    if (this.products.some((p) => p.code === product.code)) {
      console.log('Error: El codigo ya existe');
      return;
    }

    // Agrega el producto al arreglo con un id autoincrementable
    product.id = this.productId;
    this.products.push(product);
    this.productId++;

    this.saveProducts();

    console.log('Producto agregado correctamente');
  }

  getProducts() {
    this.loadProducts();
    return this.products;
  }

  getProductById(id) {
    this.loadProducts();
    const product = this.products.find((p) => p.id === id);

    if (product) {
      return product;
    } else {
      console.log('Producto no encontrado');
    }
  }

  updateProduct(id, updatedFields) {
    this.loadProducts();
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      const updatedProduct = { ...this.products[productIndex], ...updatedFields };
      this.products[productIndex] = updatedProduct;
      this.saveProducts();
      console.log('Producto actualizado correctamente');
    } else {
      console.log('Producto no encontrado');
    }
  }

  deleteProduct(id) {
    this.loadProducts();
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      console.log('Producto eliminado correctamente');
    } else {
      console.log('Producto no encontrado');
    }
  }
}

