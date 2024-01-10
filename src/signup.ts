import { axiosInstance } from "./utils/axios";

const formSignUp = document.querySelector<HTMLButtonElement>('#registerForm')!;
const modalTitle = document.getElementById('staticBackdropLabel') as HTMLHeadingElement;
const modalMessage = document.getElementById('modal-message') as HTMLParagraphElement;

formSignUp.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await signup();
        console.log(response);
        modalTitle.textContent = 'Success';
        modalMessage.textContent = 'Usuario created successfully';
        $('#staticBackdrop').modal('show');
        $('#staticBackdrop').on('hidden.bs.modal', function () {
            // Redirigir a la página login.html
            window.location.href = 'login.html';
        });
    } catch (e) {
        console.error("Error:", e);
        if (isAxiosError(e) && e.response && e.response.data && e.response.data.error) {
            modalTitle.textContent = 'Error creating user';
            modalMessage.textContent = e.response.data.message[0];
            $('#staticBackdrop').modal('show');
        }
    }
});

export const signup = async () => {
    const response = await axiosInstance.post("/auth/signup", formSignUp, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response;
};

// Función auxiliar para verificar si un objeto es de tipo AxiosError
const isAxiosError = (error: any): error is import("axios").AxiosError => {
    return error.isAxiosError === true;
};