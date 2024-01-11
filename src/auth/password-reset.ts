import { axiosInstance } from "../utils/axios";

const formReset = document.getElementById('resetForm') as HTMLFormElement;

formReset.addEventListener('submit', async (event) => {
    event.preventDefault();
    await reset();
});

const resetPass = {
    password: formReset.password.value,
    passwordConfirmation: formReset.passwordConfirmation.value,
    token: new URLSearchParams(window.location.search).get('token'),
}

const reset = async () => {
    await axiosInstance.post("/password-reset/reset-password", resetPass, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}