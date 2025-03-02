import axios from 'axios';

// Create an Axios instance with a base URL
const instance = axios.create({
  baseURL: 'http://localhost:3000', // Update with your backend URL
  timeout: 10000, // Optional: Set a timeout for requests (10 seconds)
});

//Add a request interceptor to include the token in the Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Retrieve the token from localStorage
    console.log("Token retrieved from localStorage:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    console.log("Intercepted request:", config.url, config.headers);

    return config;
  },
  (error) => {
    // Handle errors during request configuration
    return Promise.reject(error);
  }
  
);

// Add a response interceptor for error handling
instance.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  (error) => {
    const { response } = error;

   // if (response?.status === 401 || response?.status === 403) {
      if ( response?.status === 403) {
      // Delay redirect for 3 seconds
      localStorage.removeItem('access_token');
      console.log("Redirecting to login page in 3 seconds.");
      setTimeout(() => {
        window.location.href = '/login';
      }, 3); // 3-second delay
    } else if (response?.status >= 500) {
      // Optional: Handle server errors (500+)
      console.error('Server error:', response?.statusText || 'Unknown error');
    } else if (!response) {
      // Optional: Handle network errors or no response
      console.error('Network error: Please check your internet connection.');
    }

    return Promise.reject(error); // Always reject the error to allow further handling
  }
);

export default instance;
