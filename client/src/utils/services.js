import axios from 'axios';

export const baseUrl = "http://localhost:5001/api"; // Server URL where requests are sent from the client

export const postRequest = async (url, body) => {
  const userItem = localStorage.getItem('User');
  var userToken=null;
if (userItem) {
    const userObject = JSON.parse(userItem);
    userToken = userObject.token;
}

  try {
    console.log(body);
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json",
      "Authorization" : userToken}
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
    const response = await axios.get(url,
      {
        headers: { "Content-Type": "application/json",
        "Authorization" : JSON.parse(localStorage.getItem('User')).token}
      }
    );
    return response.data;
  } catch (error) {
    let message = "An error occurred";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
    return { error: true, message };
  }
};
