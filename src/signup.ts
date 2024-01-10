import { axiosInstance } from "./utils/axios";

const formSignUp = document.querySelector<HTMLButtonElement>('#registerForm')!;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

formSignUp.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await signup();
        console.log(response);
    } catch (e) {
        console.error("Error:", e);
        if (isAxiosError(e) && e.response && e.response.data && e.response.data.error) {
            errorMessage.textContent = e.response.data.message[0];
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
    return response.data;
};

// Función auxiliar para verificar si un objeto es de tipo AxiosError
const isAxiosError = (error: any): error is import("axios").AxiosError => {
    return error.isAxiosError === true;
};