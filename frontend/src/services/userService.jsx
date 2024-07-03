import axios from "axios";

const API_URL = "https://quicksend-eight.vercel.app/api/v1";

export const getUserDetails = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getUsers = async (filter, token) => {
  const response = await axios.get(`${API_URL}/user/bulk?filter=${filter}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const transferMoney = async (to, amount, token) => {
  const response = await axios.post(
    `${API_URL}/account/transfer`,
    { to, amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const updateUserProfile = async (userData, token) => {
  const response = await axios.put(
    `${API_URL}/user`,
    userData,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getTransactionHistory = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/account/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

