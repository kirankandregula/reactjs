import React, { useState, useEffect } from 'react';
import UserService from './services/UserService';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; // Import useCookies from react-cookie

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    userName: '',
    passWord: ''
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie] = useCookies(['userName', 'userRole']); // Use useCookies hook

  useEffect(() => {
    const { userName, userRole } = cookies;
    if (userName && userRole) {
      navigate(`/${userRole.toLowerCase()}/${userName}/${userRole}`);
    }
  }, [cookies, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.login(credentials)
      .then(response => {
        const userData = response.data;
        setCookie('userName', userData.userName, { path: '/' }); // Set cookie for userName
        setCookie('userRole', userData.role, { path: '/' }); // Set cookie for userRole
        navigate(`/${userData.role.toLowerCase()}/${userData.userName}/${userData.role}`);
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid username or password');
      });
  };

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
            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#7700a6" }}>Login</button>
            <Link className="nav-link card-title mt-3" to="/register">New User Registration</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
