import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import UserService from '../services/UserService';
import { useCookies } from 'react-cookie';

const ManagerComponent = () => {
  const { userName, userRole } = useParams(); // Accessing dynamic parameters from the URL
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [, , removeCookie] = useCookies(['userName', 'userRole']); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchUsers();
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

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error fetching users. Please try again.');
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await ProductService.deleteHealthProduct(productId);
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  const handleLogout = () => {
    removeCookie('userName', { path: '/' });
    removeCookie('userRole', { path: '/' });
    navigate('/');
  };

  const handleUserDelete = async (userId) => {
    try {
      await UserService.deleteUser(userId);
      fetchUsers();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  return (
    <div>
    <div className='d-flex justify-content-end mt-5 mx-2 mb-2 text-end text-white'>
      <div style={{ backgroundColor: '#c62fde', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>
        <h5 className='mt-2'>Welcome {userName.toUpperCase()}</h5>
        <h6>Role: {userRole}</h6>
      </div>
    </div>
        

      <div className='d-flex justify-content-between'>
      <div className="mb-3">
        <Link to={`/add-product/${userName}/${userRole}`} className="btn btn-success mx-2">Add Product</Link>
        <Link to={`/add-user/${userName}/${userRole}`} className="btn btn-success mx-2">Add User</Link>
        <Link to={`/`} className="btn btn-success mx-2">Home</Link>
      </div>
      <div className="text-center">
        <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
      </div>
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
                  <button className="btn btn-outline-danger" onClick={() => handleProductDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-center m-3">Users</h2>
        <table className="table table-info">
          <thead>
            <tr>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>
                  <Link to={{ pathname: `/update-user/${user.id}/${userName}/${userRole}`}} className="btn btn-outline-success mx-2">Update</Link>
                  <button className="btn btn-outline-danger" onClick={() => handleUserDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default ManagerComponent;
