import { Router } from "express";
import { MoviesUseCase } from "../../application/moviesUseCases";
import { SqlMoviesRepository } from "../repository/sql.movies.repository";
import { MoviesController } from "../controller/movies.controllers";

const router = Router();

const sqlMoviesRepository = new SqlMoviesRepository();
const moviesUseCase = new MoviesUseCase(sqlMoviesRepository);
const moviesCtrl = new MoviesController(moviesUseCase);

router.post("/", moviesCtrl.createMovieCtrl);

router.get("/", moviesCtrl.getMovieCtrl);
router.get("/latest-releases", moviesCtrl.latestReleasesCtrl);

export default router;
