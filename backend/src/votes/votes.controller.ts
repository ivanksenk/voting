import { Request, Response } from "express";
import { VotesService } from "./votes.service";
import { AppError } from "../middleware/errorHandler.middleware";

interface CustomRequest extends Request {
    clientIp?: string;
}

export class VotesController {

    static async voteIdea(req: CustomRequest, res: Response) {
        const { ideaId } = req.params;
        const clientIp = req.clientIp;
        try {
            if (!clientIp) {
                return res.status(500).send({ status: 500, message: 'Internal server error' })
            }

            if (!ideaId || isNaN(parseInt(ideaId))) {
                return res.status(400).send({
                    status: 400,
                    message: 'Invalid id param. Id must be only number'
                })
            }

            const voteResult = await VotesService.voteIdea(+ideaId, clientIp);

            res.status(+voteResult.status).send(voteResult);

        } catch (error) {
            console.log('Vote idea error:', error);
            res.status(500).send({ status: 500, message: 'Internal server error' })
        }

    }

    static async votesStatus(req: CustomRequest, res: Response) {
        const clientIp = req.clientIp;
        try {
            if (!clientIp) {
                return res.status(500).send({ status: 500, message: 'Internal server error' })
            }

            const statusResult = await VotesService.votesStatus(clientIp);


            res.status(+statusResult.status).send(statusResult);

        } catch (error) {
            console.log('Vote idea error:', error);
            res.status(500).send({ status: 500, message: 'Internal server error' })
        }
    }

}