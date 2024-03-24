import React, { useState } from 'react';
import UserService from './services/UserService';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [user, setUser] = useState({
    userName: '',
    passWord: '',
    role: 'CUSTOMER' // Default role
  });

  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.addUser(user)
      .then(response => {
        console.log('User registered successfully:', response.data);
        // Display success message
        setSuccessMessage('User registered successfully');
        // Reset form
        setUser({
          userName: '',
          passWord: '',
          role: 'CUSTOMER'
        });
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');  
        }, 3000);
       
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h1 className="text-center mb-4 card-title">User Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">Username:</label>
              <input type="text" id="userName" name="userName" value={user.userName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="passWord" className="form-label">Password:</label>
              <input type="password" id="passWord" name="passWord" value={user.passWord} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-success w-100" style={{ backgroundColor: "#7700a6" }}>Register</button>
            <Link className="nav-link card-title mt-3" to="/login">Already User? Login</Link>
          </form>
          {successMessage && <p className="text-center text-success mt-3">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
