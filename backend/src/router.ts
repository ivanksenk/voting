import { Router } from "express";
import { Request, Response } from "express";
import { IdeasRouter } from "./Ideas/router";
import { VotesRouter } from "./votes/router";
import { checkAuth } from "./middleware/auth.middleware";
import { checkRole } from "./middleware/role.middleware";

export const MainRouter = Router();

MainRouter.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Api ver. 1',
        constacts: '@ivanksenk'
    })
})

MainRouter.use('/ideas', checkAuth, checkRole, IdeasRouter);
MainRouter.use('/votes', checkAuth, checkRole, VotesRouter)