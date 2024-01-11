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
    document.getElementById('releaseYear')!.setAttribute('value', game.releaseYear);
    document.getElementById('image')!.setAttribute('value', game.image);
    document.getElementById('genre')!.setAttribute('value', game.genre.join(','));
    document.getElementById('platforms')!.setAttribute('value', game.platforms.join(','));
};

loadGame();

const formEdit = document.querySelector<HTMLFormElement>('#editForm')!;