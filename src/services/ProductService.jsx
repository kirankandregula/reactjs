// ProductService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const ProductService = {
  getAllHealthProducts: async () => {
    try {
      return await axios.get(`${BASE_URL}/product/health/get`);
    } catch (error) {
      throw error;
    }
  },

  getProductById: async (productId) => {
    try {
      return await axios.get(`${BASE_URL}/product/health/get/${productId}`);
    } catch (error) {
      throw error;
    }
  },

  addHealthProduct: async (product) => {
    try {
      return await axios.post(`${BASE_URL}/product/health/add`, product);
    } catch (error) {
      throw error;
    }
  },

  updateHealthProduct: async (productId, productData) => {
    try {
      return await axios.put(`${BASE_URL}/product/health/update/${productId}`, productData);
    } catch (error) {
      throw error;
    }
  },

  deleteHealthProduct: async (productId) => {
    try {
      return await axios.delete(`${BASE_URL}/product/health/delete/${productId}`);
    } catch (error) {
      throw error;
    }
  }
};

export default ProductService;
