import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import { Link } from 'react-router-dom';

const AddProductComponent = () => {
  const navigate = useNavigate();
  const { userName, userRole } = useParams();
  const [product, setProduct] = useState({
    category: 'health',
    name: '',
    price: 0
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(product);
      await ProductService.addHealthProduct(product);
      alert('Product added successfully!');
      setProduct({
        name: '',
        price: 0
      });
      navigate(`/admin/${userName}/${userRole}`);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome {userName}</h1>
      <h2 className="text-center mb-4">Role: {userRole}</h2>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Name:</label>
              <input type="text" id="productName" name="name" value={product.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">Price:</label>
              <input type="number" id="productPrice" name="price" value={product.price} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      </div>

      <div className="mt-3">
        <Link to={`/admin/${userName}/${userRole}`} className="btn btn-secondary">Back</Link>
      </div>
    </div>
  );
};

export default AddProductComponent;
