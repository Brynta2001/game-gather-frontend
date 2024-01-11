import { axiosInstance } from "../utils/axios";

const formLogin = document.getElementById('loginForm') as HTMLFormElement;
const modalTitle = document.getElementById('staticBackdropLabel') as HTMLHeadingElement;
const modalMessage = document.getElementById('modal-message') as HTMLParagraphElement;

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
        modalTitle.textContent = 'Success';
        modalMessage.textContent = 'Logged in successfully';
        $('#staticBackdrop').modal('show');
        $('#staticBackdrop').on('hidden.bs.modal', function () {
            // Redirigir a la página login.html
            window.location.href = '../games/dashboard.html';
        });
        localStorage.setItem('token', response.data.token);
        axiosInstance.defaults.headers.common['Authorization'] = response.data.token;
    }).catch((error) => {
        console.log(error);
    })
};