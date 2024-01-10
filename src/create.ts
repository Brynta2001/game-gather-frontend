import { axiosInstance } from "./utils/axios";

const formGame = document.querySelector<HTMLButtonElement>('#createForm')!;

formGame.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await signup();
    console.log(response);
});

export const signup = async () => {
    const response = await axiosInstance.post("/games", {
        title: "Rocket League",
        publisher: "Psyonix",
        releaseYear: 2015,
        genre: ["Sports"],
        platforms: ["PC"],
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data;
};
