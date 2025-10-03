import { Router } from "express";
import { IdeasController } from "./ideas.controller";

export const IdeasRouter = Router();

IdeasRouter.post('/', IdeasController.create);
IdeasRouter.get('/',IdeasController.getAll);
IdeasRouter.get('/:id',IdeasController.getById);