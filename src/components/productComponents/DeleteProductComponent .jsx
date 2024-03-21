import React from 'react';
import ProductService from '../../services/ProductService';

const DeleteProductComponent = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(productId);
      onDelete(productId);
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteProductComponent;
