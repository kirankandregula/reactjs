import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';

const InsuranceProductComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchInsuranceProducts();
  }, []);

  const fetchInsuranceProducts = async () => {
    try {
      const response = await ProductService.getInsuranceProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching insurance products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await ProductService.deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting insurance product:', error);
    }
  };

  return (
    <div>
      <h2>Insurance Products</h2>
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

export default InsuranceProductComponent;
