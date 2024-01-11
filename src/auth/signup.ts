import { axiosInstance } from "../utils/axios";

const formSignUp = document.querySelector<HTMLButtonElement>('#registerForm')!;
const modalTitle = document.getElementById('staticBackdropLabel') as HTMLHeadingElement;
const modalMessage = document.getElementById('modal-message') as HTMLParagraphElement;

formSignUp.addEventListener('submit', async (event) => {
    event.preventDefault();
    await signup();
});

const signup = async () => {
    await axiosInstance.post("/auth/signup", formSignUp, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(() => {
        //console.log(response);
        modalTitle.textContent = 'Success';
        modalMessage.textContent = 'User created successfully';
        $('#staticBackdrop').modal('show');
        $('#staticBackdrop').on('hidden.bs.modal', function () {
            // Redirigir a la página login.html
            window.location.href = 'login.html';
        });
    }).catch((error) => {
        console.log(error);
        modalTitle.textContent = 'Error creating user';
        modalMessage.textContent = error.response?.data?.message;
        $('#staticBackdrop').modal('show');
    });
};