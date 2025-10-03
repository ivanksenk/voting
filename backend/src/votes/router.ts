import { Router } from "express";
import { ipDetect } from "../middleware/ipDetect.middleware";
import { VotesController } from "./votes.controller";


export const VotesRouter = Router();

VotesRouter.use(ipDetect);

VotesRouter.post('/:ideaId/vote', VotesController.voteIdea);
VotesRouter.get('/status', VotesController.votesStatus)