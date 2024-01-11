import { axiosInstance } from "../utils/axios";

const id = new URLSearchParams(window.location.search).get('id')!;

const drop = async (editGame: any) => {

    await axiosInstance.patch(`/games/${id}`, editGame, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
        /*modalTitle.textContent = 'Success';
        modalMessage.textContent = 'Game created successfully';
        $('#staticBackdrop').modal('show');
        $('#staticBackdrop').on('hidden.bs.modal', function () {
            // Redirigir a la página login.html
            window.location.href = '../games/dashboard.html';
        });*/
    }).catch((error) => {
        console.log(error);
        /*modalTitle.textContent = 'Error creating user';
        modalMessage.textContent = error.response?.data?.message;
        $('#staticBackdrop').modal('show');*/
    });
};