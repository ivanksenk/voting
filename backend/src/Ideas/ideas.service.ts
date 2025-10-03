import { IdeaInterface } from "../types";
import { IdeaModel } from "./ideas.model";


export class IdeaService {
    static async create(idea: IdeaInterface) {
        return await IdeaModel.create(idea.title, idea.description);
    }

    static async getAll() {
        return IdeaModel.getAll();
    }

    static async getById(id: number) {
        const idea = await IdeaModel.findById(id);
        if (!idea || !Object.keys(idea).length) {
            return null
        }
        return idea
    }
}