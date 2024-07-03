import axios from "axios";

const API_URL = "https://quicksend-eight.vercel.app/api/v1";

export const signup = async (firstName, lastName, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        firstName,
        lastName,
        username: email,
        password,
      });
      console.log('Signup response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  };
  
  export const signin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/user/signin`, {
        username: email,
        password,
      });
      console.log('Signin response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signin error:', error.response?.data || error.message);
      throw error;
    }
  };