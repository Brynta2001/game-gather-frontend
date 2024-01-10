import axios from "axios";

//const axios = require('axios/dist/node/axios.cjs');
const instance = axios.create({
    baseURL: "http://localhost:3000"
});

export const signup = async (username: string, email: string, password: string, fullName: string) => {
    const response = await instance.post("/signup", { username, email, password, fullName });
    return response.data;
};

