import { axiosInstance } from "../utils/axios";

const getGame = async (id: number) => {
    const game = await axiosInstance.get(`/games/${id}`);
    return game.data;
};

const renderGame = async () => {
    const id = new URLSearchParams(window.location.search).get('id')!;
    const game = await getGame(+id);
    console.log(game);

    document.getElementById('game-title')!.textContent = game.title;
    document.getElementById('game-description')!.textContent = game.description;
    document.getElementById('game-platforms')!.textContent = game.platforms.join(' - ');
    document.getElementById('game-image')!.setAttribute('src', game.image);
};

renderGame();