import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';

const AdminComponent = () => {
  const { userName, userRole } = useParams(); // Accessing dynamic parameters from the URL
  console.log(userName,userRole);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await ProductService.getAllHealthProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error fetching products. Please try again.');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await ProductService.deleteHealthProduct(productId);
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  return (
    <div>
      <h1 className='text-center'>Welcome {userName}</h1>
      <h2 className='text-center'>Role: {userRole}</h2>

      <div className="mb-3">
    
        <Link to={`/add-product/${userName}/${userRole}`} className="btn btn-success mx-2">Add Product</Link>
      
         <Link to={`/`} className="btn btn-success mx-2">Home</Link>
      </div>

   

      <div>
        <h2 className="text-center m-3">Products</h2>
        <table className="table table-info">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name.toUpperCase()}</td>
                <td>${product.price}</td>
                <td>
                  {/* Include name and role in the URL */}
                  <Link to={{ pathname: `/update/${product.id}/${userName}/${userRole}`}} className="btn btn-outline-success mx-2">Update</Link>
                  <button className="btn btn-outline-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComponent;
