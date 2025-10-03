import { Idea } from "../types/types";
import { ideaAxios } from "./config"

export const getIdeasList = async (): Promise<Idea[] | null> => {
    try {
        const ideas = await ideaAxios.get('/ideas');
        return ideas.data as Promise<Idea[]>;
    } catch (error) {
        console.log(error);
        return null
    }
}

