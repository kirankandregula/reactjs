import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';

const HealthProductComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchHealthProducts();
  }, []);

  const fetchHealthProducts = async () => {
    try {
      const response = await ProductService.getHealthProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching health products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await ProductService.deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting health product:', error);
    }
  };

  return (
    <div>
      <h2>Health Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthProductComponent;
