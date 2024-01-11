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
    addListeners();

};

const addListeners = () => {
    const messagesUl = document.getElementById('messages-li') as HTMLUListElement;
    const messageInput = document.getElementById('message-input') as HTMLInputElement;
    const messageForm = document.getElementById('message-form') as HTMLFormElement;

    socket.on('connect', () => {
        console.log('Conectado al servidor de sockets');
    });

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor de sockets');
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if(messageInput.value.trim().length <= 0) return;

        socket.emit('message-from-client', {
            id: 'ID',
            message: messageInput.value
        });

        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        console.log(payload);
        let newMessage = '';
        if (localStorage.getItem('user')! == payload.fullName) {
            newMessage = `
            <li class="clearfix">                                
                <div class="message other-message float-right">${payload.message}</div>
            </li>
            `;
        }else{
            newMessage = `
            <li class="clearfix">
                <div class="message-data">
                    <span class="color-1">Send by: </span><span id="user-name" class="message-data-user color-1">${payload.fullName}</span>                                    
                </div>
                <div class="message my-message">${payload.message}</div>
            </li>
            `;
        }
        
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    });

};