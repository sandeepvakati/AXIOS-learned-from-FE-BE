import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://axios-practice-backend.onrender.com',
    timeout: 10000,
});

export default axiosInstance;