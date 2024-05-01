import axios from 'axios';

export const baseUrl = "http://localhost:5001/api"; // Server URL where requests are sent from the client

export const postRequest = async (url, body) => {
  try {
    console.log(body);
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    let message = "An error occurred";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
    return { error: true, message };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    let message = "An error occurred";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
    return { error: true, message };
  }
};
