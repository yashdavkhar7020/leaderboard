// src/services/api.js

import axios from 'axios';

// Base URL for the API, using environment variable or defaulting to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/users';

// Function to add a new user
export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data; // Return the created user data
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; // Throw the error for further handling
  }
};

// Function to get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Assuming the backend returns an array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Throw the error for further handling
  }
};

// Function to get claim history for a user
export const getClaimHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/claim-history`);
    return response.data; // Assuming the backend returns an array of claim history records
  } catch (error) {
    console.error('Error fetching claim history:', error);
    throw error; // Throw the error for further handling
  }
};

// Function to award points to a user
export const awardPoints = async (userId, points) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/award-points`, { points });
    return response.data; // Assuming the backend returns the updated user data
  } catch (error) {
    console.error('Error awarding points:', error);
    throw error; // Throw the error for further handling
  }
};
