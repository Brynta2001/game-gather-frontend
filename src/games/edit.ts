import { axiosInstance } from "../utils/axios";

const getGame = async (id: number) => {
    const game = await axiosInstance.get(`/games/${id}`);
    return game.data;
};

const loadGame = async () => {
    const id = new URLSearchParams(window.location.search).get('id')!;
    const game = await getGame(+id);

    document.getElementById('title')!.setAttribute('value', game.title);
    document.getElementById('description')!.textContent = game.description;
    document.getElementById('publisher')!.setAttribute('value', game.publisher);
    //(document.getElementById('releaseYear') as HTMLInputElement).value = game.releaseYear.toString();
    //document.getElementById('image')!.setAttribute('value', game.image);
    //document.getElementById('genre')!.setAttribute('value', game.genre.join(','));
    //document.getElementById('platforms')!.setAttribute('value', game.platforms.join(','));
};

loadGame();

const formEdit = document.querySelector<HTMLButtonElement>('#editForm')!;

formEdit.addEventListener('submit', async (event) => {
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

    await edit(createGame);
});

const edit = async (createGame: any) => {

    await axiosInstance.patch("/games/images", {
        file: document.querySelector('#images')!.files[0]
    }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then((response) => {
        createGame.image = response.data.secureUrl;
    })

    await axiosInstance.patch("/games", createGame, {
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