import React, { useState, useEffect } from 'react';
import {  useParams, useNavigate, Link } from 'react-router-dom';
import ProductService from '../services/ProductService';

const UpdateProductComponent = () => {
  const { id ,userName,userRole} = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: 0,
  });



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getProductById(id);
        setProduct(response.data);
        setUpdatedProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.updateHealthProduct(id, updatedProduct);
      alert('Product updated successfully!');
      navigate(`/admin/${userName}/${userRole}`);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-dark p-4">
      <h2 className="text-white text-center">Update Product</h2>
      <h3 className="text-white text-center">Admin Name: {userName}</h3> {/* Display admin name */}
      <h3 className="text-white text-center">Admin Role: {userRole}</h3> {/* Display admin role */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-white">Name:</label>
          <input type="text" className="form-control" name="name" value={updatedProduct.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Price:</label>
          <input type="number" className="form-control" name="price" value={updatedProduct.price} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-info">Update Product</button>
      </form>

      <div className="mt-3">
        <Link to={`/manager/${userName}/${userRole}`} className="btn btn-danger">Back</Link>
      </div>
    </div>
  );
};

export default UpdateProductComponent;
