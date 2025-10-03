import { VotingStatus } from "../types/types";
import { ideaAxios } from "./config";

export const votingStatus = async ():Promise<VotingStatus | null> => {
    try {
        const status = await ideaAxios.get('/votes/status');
        return status.data as Promise<VotingStatus>;
    } catch (error) {
        console.log(error);
        return null
    }
}

export const voteIdea = async (ideaId: number) => {
    try {
        const vote = await ideaAxios.post(`/votes/${ideaId}/vote`);
        return vote
    } catch (error) {
        console.log(error);
        return null
    }
}