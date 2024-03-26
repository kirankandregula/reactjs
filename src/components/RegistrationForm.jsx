import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from './services/UserService';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card w-50">
        <div className="card-body">
          <h1 className="text-center mb-4 card-title">User Registration</h1>
          <Formik
            initialValues={{
              userName: '',
              passWord: '',
              role: 'CUSTOMER'
            }}
            validationSchema={Yup.object({
              userName: Yup.string()
                .min(4, 'Username must be at least 4 characters')
                .matches(/^[a-zA-Z]+$/, 'Username must contain only letters')
                .required('Username is required'),
              passWord: Yup.string()
                .min(4, 'Password must be at least 4 characters')
                .required('Password is required')
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              UserService.addUser(values)
                .then(response => {
                  console.log('User registered successfully:', response.data);
                  // Display success message
                  resetForm();
                  navigate('/');
                })
                .catch(error => {
                  console.error('Error registering user:', error);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
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
              <button type="submit" className="btn btn-success w-100" style={{ backgroundColor: "#7700a6" }}>Register</button>
              <Link className="nav-link card-title mt-3" to="/login">Already User? Login</Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
