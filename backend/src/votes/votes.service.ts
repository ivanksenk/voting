import { IdeaModel } from "../Ideas/ideas.model";
import { VotesModel } from "./votes.model";
export class VotesService {

    static async voteIdea(ideaId: number, clientIp: string) {
        const ideaCheck = await IdeaModel.findById(+ideaId);

        if (!ideaCheck) {
            return { status: 404, message: `Idea ${ideaId} not found` }
        }

        const checkVote = await VotesModel.checkExistingVote(ideaId, clientIp);

        if (checkVote) {
            return { status: 409, message: `Already voted idea - ${ideaId}` }
        }

        const countVote = await VotesModel.countVotes(clientIp);

        if (parseInt(countVote) >= 10) {
            return { status: 409, message: `Vote limit exceeded (max 10 ideas per IP)` }
        }
        const saveVote = await VotesModel.writeVote(ideaId, clientIp);

        if (!saveVote) {
            return { status: 500, message: `Internal server Error` }
        }

        return { status: 200, message: 'Vote successfully' }
    }

    static async votesStatus(clientIp: string) {
        const status = await VotesModel.votesStatus(clientIp);
        return {
            status:200,
            votedCount: parseInt(status.rows[0].voted_count),
            votedIdeas: status.rows[0].voted_ideas || [],
            votesRemaining: Math.max(0, 10 - parseInt(status.rows[0].voted_count))
        };
    }

}