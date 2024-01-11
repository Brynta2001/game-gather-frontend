import { axiosInstance } from "../utils/axios";
import { Game } from "./interfaces/game.interface";

const cardContainer = document.getElementById('card-container') as HTMLDivElement;
/*
const token: string | null = localStorage.getItem('token');

if (!token) {
    window.location.href = '../auth/login.html';
} else {
    console.log('Token válido:', token);
}*/

const getGames = async () => {
    const games = await axiosInstance.get('/games');
    return games.data;
};

const renderGames = async () => {
    const games = await getGames();
    console.log(games);

    games.forEach((game: Game) => {
        cardContainer.innerHTML += `
        <div class="col-lg-6 col-12">
            <div class="card card-profile mt-4 z-index-2">
                <div class="row">
                    <div class="col-lg-6 col-md-8 col-12">
                        <a href="game.html?id=${game.id}">
                            <div class="p-3 pe-md-0">
                                <img class="w-100 border-radius-md shadow-lg"
                                    src="${game.image}" alt="image">
                            </div>
                        </a>
                    </div>
                    <div class="col-lg-6 col-md-4 col-12 my-auto">
                        <div class="card-body ps-lg-0">
                            <h5 id="game-title" class="mb-0">${game.title}</h5>
                            <h6 id="publisher" style="color: #ed6190;">${game.publisher}</h6>
                            <p id="genre" class="mb-0"><strong>Genre: </strong>${game.genre.join(' - ')}</p>
                            <p id="platforms" class="mb-0"><strong>Platform: </strong>${game.platforms.join(' - ')}</p>
                            <p id="release-date" class="mb-0"><strong>Release: </strong>${game.releaseYear}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
};

renderGames();