import { axiosInstance } from "../utils/axios";

const formLogin = document.getElementById('loginForm') as HTMLFormElement;

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();
    await login();
});

const login = async () => {
    await axiosInstance.post("/auth/login", formLogin, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        window.location.href = '../games/dashboard.html';
    }).catch((error) => {
        console.log(error);
    })
};