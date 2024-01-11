import { axiosInstance } from "../utils/axios";

const formRecover = document.getElementById('mailForm') as HTMLFormElement;

formRecover.addEventListener('submit', async (event) => {
    event.preventDefault();
    await recover();
});

const recover = async () => {
    await axiosInstance.post("/password-reset/forgot-password", formRecover, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}
