import axios from 'axios';
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout:10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
    (config)=> {
        const accesstoken = localStorage.getItem("token");
        if(accesstoken){
            config.headers.Authorization = `Bearer ${accesstoken}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

//Respose Interceptor 

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle specific error responses here if needed
        if(error.response) {
            if(error.response.status === 401){
                //redirect to login page
                window.location.href = "/login";
            }else if(error.response.status === 500){
                console.error("Server error. Please try again later.");
            }
        }else if(error.code === "ECONNABORATED"){
            console.error("Network error. Please check your connection.");
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;