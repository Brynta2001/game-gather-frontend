import { axiosInstance } from "../utils/axios";

const token: string | null = localStorage.getItem('token');
/*
if (!token) {
    window.location.href = '../auth/login.html';
} else {
    console.log('Token válido:', token);
}*/


const createGameForm = document.querySelector<HTMLButtonElement>('#create-game-form')!;
const modalTitle = document.getElementById('staticBackdropLabel') as HTMLHeadingElement;
const modalMessage = document.getElementById('modal-message') as HTMLParagraphElement;

createGameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { selectedOptions: selectedGenreOptions } = document.querySelector<HTMLSelectElement>('#genre-selector')!;
    const selectedGenres = [...selectedGenreOptions].map((element) => {
        return element.text;
    });

    const { selectedOptions: selectedPlatformOptions } = document.querySelector<HTMLSelectElement>('#platform-selector')!;
    const selectedPlatforms = [...selectedPlatformOptions].map((element) => {
        return element.text;
    });

    const createGame = {
        title: document.querySelector<HTMLInputElement>('#title')!.value,
        publisher: document.querySelector<HTMLInputElement>('#publisher')!.value,
        releaseYear: +document.querySelector<HTMLInputElement>('#releaseYear')!.value,
        genre: selectedGenres,
        platforms: selectedPlatforms,
        description: document.querySelector<HTMLTextAreaElement>('#description')!.value,
        image: "",
    };

    await create(createGame);
});

const create = async (createGame: any) => {

    await axiosInstance.post("/games/images", {
        file: document.querySelector('#images')!.files[0]
    }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((response) => {
        createGame.image = response.data.secureUrl;
    })

    await axiosInstance.post("/games", createGame, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
        modalTitle.textContent = 'Success';
        modalMessage.textContent = 'Game created successfully';
        $('#staticBackdrop').modal('show');
        $('#staticBackdrop').on('hidden.bs.modal', function () {
            // Redirigir a la página login.html
            window.location.href = '../games/dashboard.html';
        });
    }).catch((error) => {
        //console.log(error);
        modalTitle.textContent = 'Error creating user';
        modalMessage.textContent = error.response?.data?.message;
        $('#staticBackdrop').modal('show');
    });
};