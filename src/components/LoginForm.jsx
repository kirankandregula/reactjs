import React, { useState, useEffect } from 'react';
import UserService from './services/UserService';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['userName', 'userRole']);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { userName, userRole } = cookies;
    if (userName && userRole) {
      navigate(`/${userRole.toLowerCase()}/${userName}/${userRole}`);
    }
  }, [cookies, navigate]);

  const handleSubmit = (values, { setSubmitting }) => {
    UserService.login(values)
      .then(response => {
        const userData = response.data;
        setCookie('userName', userData.userName, { path: '/' });
        setCookie('userRole', userData.role, { path: '/' });
        navigate(`/${userData.role.toLowerCase()}/${userData.userName}/${userData.role}`);
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setErrorMessage('Invalid username or password');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h2 className="card-title text-center">User Login</h2>
          {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
          <Formik
            initialValues={{
              userName: '',
              passWord: ''
            }}
            validationSchema={Yup.object({
              userName: Yup.string().required('Username is required'),
              passWord: Yup.string().required('Password is required')
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">Username:</label>
                <Field type="text" id="userName" name="userName" className="form-control" />
                <ErrorMessage name="userName" component="div" className="text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="passWord" className="form-label">Password:</label>
                <Field type="password" id="passWord" name="passWord" className="form-control" />
                <ErrorMessage name="passWord" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#7700a6" }}>Login</button>
              <Link className="nav-link card-title mt-3" to="/register">New User Registration</Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
