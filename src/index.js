import "dotenv/config";
import Server from "./server";

export const server = new Server();

server.listen();
