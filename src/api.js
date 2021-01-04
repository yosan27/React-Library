import axios from "axios";

export default axios.create({
  
  baseURL: `http://localhost:8500`,
  // baseURL: process.env.API_URL_PRODUCTION,
  // baseURL: process.env.API_URL,
  timeout: 15000,
});