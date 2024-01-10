import axios from "axios";

//const axios = require('axios/dist/node/axios.cjs');
export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/auth",
    headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});