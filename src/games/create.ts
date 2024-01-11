import { axiosInstance } from "../utils/axios";

const gameForm = document.querySelector<HTMLButtonElement>('#create-game-form')!;

gameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await signup();
    console.log(response);
});

const signup = async () => {
    await axiosInstance.post("/games", gameForm, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(() => {
        //console.log(response);
        /*modalTitle.textContent = 'Success';
        modalMessage.textContent = 'Usuario created successfully';
        $('#staticBackdrop').modal('show');
        $('#staticBackdrop').on('hidden.bs.modal', function () {
            // Redirigir a la página login.html
            window.location.href = 'login.html';
        });*/
    }).catch((error) => {
        console.log(error);
        //modalTitle.textContent = 'Error creating user';
        //modalMessage.textContent = error.response?.data?.message;
        //$('#staticBackdrop').modal('show');
    });
};