import fs from 'fs';

export default class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
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
      !product.code ||
      !product.stock ||
      !product.category
    ) {
      throw new Error('Error: Todos los campos son obligatorios');
    }

    // Campo "code" no esté repetido
    if (this.products.some((p) => p.code === product.code)) {
      throw new Error('Error: El codigo ya existe');
    }

    // Agrega el producto al arreglo con un id autoincrementable
    const newProduct = {
      ...product,
      id: this.generateUniqueId(),
      status: true,
      thumbnails: product.thumbnails || [],
    };
    this.products.push(newProduct);

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
      throw new Error('Producto no encontrado');
    }
  }

  updateProduct(id, updatedFields) {
    this.loadProducts();
    const productIndex = this.products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
      // Evitar actualizar el campo "id"
      delete updatedFields.id;
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProducts();
      console.log('Producto actualizado correctamente');
    } else {
      throw new Error('Producto no encontrado');
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
      throw new Error('Producto no encontrado');
    }
  }

  generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}

