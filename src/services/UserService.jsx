import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user'; // Assuming your backend API is running on this URL

const UserService = {
  registerUser: (user) => {
    return axios.post(`${BASE_URL}/add`, user); // Assuming your endpoint for user registration is /register
  },
  loginUser: (user) => {
    return axios.post(`${BASE_URL}/login`, user); // Assuming your endpoint for user login is /login
  }
};

export default UserService;
