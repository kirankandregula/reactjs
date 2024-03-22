import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Update with your Spring Boot backend URL

const UserService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/get/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching user by ID');
    }
  },

  addUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/add`, userData);
      console.log(response.data);
      return response;
    } catch (error) {
      throw new Error('Error adding user');
    }
  },

  updateUser: async (userId, userData) => {
    try {
      console.log(userData);
      const response = await axios.put(`${BASE_URL}/user/${userId}`, userData);
      return response;
    } catch (error) {
      throw new Error('Error updating user');
    }
  },

  deleteUser: async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/user/${userId}`);
    } catch (error) {
      throw new Error('Error deleting user');
    }
  },

  login: async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post(`${BASE_URL}/user/login`, userData);
      console.log(response.data);
      return response;
    } catch (error) {
      throw new Error('Error logging in');
    }
  }
};

export default UserService;
