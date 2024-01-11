import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token,
        },
    });
    // Si existe el socket entonces borra todos los listeners anteriores
    socket?.removeAllListeners();
    socket = manager.socket('/');
    // Se quita el parámetro enviado, para que el método utilice el socket global y trabaje por referencia
    //addListeners();

};