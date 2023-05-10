import { Router } from "express";
import { SqlViewMakersRepository } from "../repository/sql.viewMaker.repository.js";
import { ViewMakersUseCase } from "../../application/viewMakersUseCases.js";
import { ViewMakersController } from "../controller/viewMakers.controllers.js";

const router = Router();

const sqlViewMakersRepository = new SqlViewMakersRepository();
const viewMakersUseCase = new ViewMakersUseCase(sqlViewMakersRepository);
const viewMakersCtrl = new ViewMakersController(viewMakersUseCase);

router.post("/", viewMakersCtrl.createViewMakersCtrl);
router.get("/", viewMakersCtrl.getUsersWithViewedMoviesCtrl);

export default router;
