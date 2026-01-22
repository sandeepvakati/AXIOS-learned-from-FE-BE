import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://axios-learned-from-fe-be.onrender.com',
    timeout: 10000,
});

export default axiosInstance;