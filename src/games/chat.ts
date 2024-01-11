import { connectToServer } from "./websockets/socket-client";

connectToServer(localStorage.getItem('token')!);