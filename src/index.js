import "dotenv/config";
import { Server } from "./server.js";

export const server = new Server();

server.listen();
