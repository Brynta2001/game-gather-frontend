import { axiosInstance } from "./utils/axios";

const formSignUp = document.querySelector<HTMLButtonElement>('#registerForm')!;

formSignUp.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await signup();
    console.log(response);
});

export const signup = async () => {
    const response = await axiosInstance.post("/signup", formSignUp, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response.data;
};
