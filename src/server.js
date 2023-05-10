import express from "express";
import cors from "cors";

import authRoute from "./entities/auth/infrastructure/routes/entities.auth";
import moviesRoute from "./entities/movies/infrastructure/routes/entities.movies";
import viewMakersRoute from "./entities/viewMarkers/infrastructure/routes/entities.viewMakers";
import { pool } from "./db/sql";

class Server {
  apiPaths = {
    auth: "/api/auth",
    movies: "/api/movies",
    viewMakers: "/api/view-makers",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";
    this.dbConnection();
    this.middleware();
    this.routes();
  }

  async dbConnection() {
    try {
      pool;
      console.log("database is running");
    } catch (err) {
      console.log(err);
    }
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoute);
    this.app.use(this.apiPaths.movies, moviesRoute);
    this.app.use(this.apiPaths.viewMakers, viewMakersRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
