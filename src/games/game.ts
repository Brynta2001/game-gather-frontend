import { axiosInstance } from "../utils/axios";

const gameEdit = document.querySelector<HTMLAnchorElement>('#game-reference-edit')!;
const gameDelete = document.querySelector<HTMLAnchorElement>('#game-reference-delete')!;
const modalTitle = document.getElementById('staticBackdropLabel') as HTMLHeadingElement;
const modalMessage = document.getElementById('modal-message') as HTMLParagraphElement;

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

    gameEdit.setAttribute('href', `edit.html?id=${game.id}`);
};

renderGame();

gameDelete.addEventListener('click', async (event) => {
    event.preventDefault();
    const id = new URLSearchParams(window.location.search).get('id')!;
    await drop(+id);
    modalTitle.textContent = 'Success';
    modalMessage.textContent = 'Game deleted successfully';
    $('#staticBackdrop').modal('show');
    $('#staticBackdrop').on('hidden.bs.modal', function () {
        // Redirigir a la página login.html
        window.location.href = '../games/dashboard.html';
    });
});

const drop = async (id: number) => {
    const game = await axiosInstance.delete(`/games/${id}`);
    return game.data;
};