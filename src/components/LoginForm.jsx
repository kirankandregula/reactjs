import React, { useState } from 'react';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    userName: '',
    passWord: ''
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.loginUser(credentials)
      .then(response => {
        const userData = response.data;
        setUserRole(userData.role); // Set the user's role after successful login
        setUserName(userData.userName); // Set the user's name after successful login
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid username or password');
      });
  };

  // Conditional rendering based on user's role
  if (userRole === 'ADMIN') {
    navigate(`/admin/${userName}/${userRole}`);
  return null; // Return null after navigation
    
  } else if (userRole === 'MANAGER') {

    navigate(`/manager/${userName}/${userRole}`);
    return null;
  } else if (userRole === 'CUSTOMER') {
    navigate(`/customer/${userName}/${userRole}`);
    return null;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h2 className="card-title text-center">User Login</h2>
          {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">Username:</label>
              <input type="text" id="userName" name="userName" value={credentials.userName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="passWord" className="form-label">Password:</label>
              <input type="password" id="passWord" name="passWord" value={credentials.passWord} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <div className="mt-3">
            <Link to="/" className="btn btn-primary">Home</Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
