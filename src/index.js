import "dotenv/config";
import { Server } from "./server.js";

export const server = new Server();
export const app = new Server().app;

server.listen();
