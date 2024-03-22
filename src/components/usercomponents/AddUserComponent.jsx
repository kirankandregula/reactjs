import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';

const AddUserComponent = () => {
  const navigate = useNavigate();
  const { userName, userRole } = useParams();
  const [user, setUser] = useState({
    userName: '',
    passWord: '',
    role: 'ADMIN' // Default role
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      await UserService.addUser(user);
      alert('User added successfully!');
      setUser({
        userName: '',
        passWord: '',
        role: 'ADMIN' // Reset role after adding user
      });
      navigate(`/manager/${userName}/${userRole}`);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome {userName}</h1>
      <h2 className="text-center mb-4">Role: {userRole}</h2>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Add User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">Username:</label>
              <input type="text" id="userName" name="userName" value={user.userName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="passWord" className="form-label">Password:</label>
              <input type="password" id="passWord" name="passWord" value={user.passWord} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role:</label>
              <select id="role" name="role" value={user.role} onChange={handleChange} className="form-control" required>
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Manager</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add User</button>
          </form>
        </div>
      </div>

      <div className="mt-3">
        <Link to={`/manager/${userName}/${userRole}`} className="btn btn-secondary">Back</Link>
      </div>
    </div>
  );
};

export default AddUserComponent;
