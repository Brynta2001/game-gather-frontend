import axios from "axios";

//const axios = require('axios/dist/node/axios.cjs');
const instance = axios.create({
    baseURL: "http://localhost:3000/auth",
    headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
});

// export const signup = async (username: string, email: string, password: string, fullName: string) => {
//     const response = await instance.post("/signup", { username, email, password, fullName });
//     return response.data;
// };

const formSignUp = document.querySelector<HTMLButtonElement>('#registerForm')!;

formSignUp.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector<HTMLInputElement>('#username')!.value;
    const email = document.querySelector<HTMLInputElement>('#email')!.value;
    const password = document.querySelector<HTMLInputElement>('#password')!.value;
    const fullName = document.querySelector<HTMLInputElement>('#fullName')!.value;

    const response = await signup(username!, email!, password!, fullName!);
    console.log(response);
});

export const signup = async (username: string, email: string, password: string, fullName: string) => {
    // const response = await instance.post("/signup", { username, email, password, fullName });
    const response = await instance.post("/signup", formSignUp, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data;
};
