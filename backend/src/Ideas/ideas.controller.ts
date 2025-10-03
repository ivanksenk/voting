import { Request, Response } from "express";
import { createIdeaSchema } from "./schemas/createIdea.schema";
import { IdeaService } from "./ideas.service";


export class IdeasController {

    static async create(req: Request, res: Response) {
        try {
            const { value: data, error } = createIdeaSchema
                .prefs({ errors: { label: 'key' } })
                .validate(req.body);
            if (error) {
                res.status(400).send(error);
                return;
            }
            const idea = await IdeaService.create(data);

            if (!idea) {
                throw new Error('Create idea error');
            }

            res.status(201).send({
                status: 201,
                message: 'Idea created',
                idea
            });

        } catch (error) {
            console.log('Create idea error:', error);
            res.status(500).send({ status: 500, message: 'Internal server error' })
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const ideas = await IdeaService.getAll();
            res.send(ideas);
        } catch (error) {
            console.log('Create idea error:', error);
            res.status(500).send({ status: 500, message: 'Internal server error' })
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || isNaN(parseInt(id))) {
                return res.status(400).send({
                    status: 400,
                    message: 'Invalid id param. Id must be only number'
                })
            }
            const idea = await IdeaService.getById(+id);
            if (!idea) {
                return res.status(404).send({
                    status: 404,
                    mesage: `Idea ${id}, not found.`
                })
            }
            res.send(idea);
        } catch (error) {
            console.log('Create idea error:', error);
            res.status(500).send({ status: 500, message: 'Internal server error' })
        }
    }
}