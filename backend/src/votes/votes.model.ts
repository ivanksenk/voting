import { QueryResult } from "pg";
import { query } from "../config/postgres.config";

export class VotesModel {

    static async checkExistingVote(ideaId: number, clientIp: string) {
        const vote: QueryResult<any> = await query(`
            SELECT id FROM votes 
            WHERE idea_id = $1 
            AND ip_address = $2
            `, [ideaId, clientIp]);
        if (!vote.rows.length) {
            return false
        }
        return true
    }

    static async countVotes(clientIp: string) {
        const count = await query(`
            SELECT COUNT(DISTINCT idea_id) as count
             FROM votes 
             WHERE ip_address = $1
            `, [clientIp]);
        return count.rows[0].count
    }

    static async writeVote(ideaId: number, clientIp: string) {
        try {
            await query(`BEGIN`);
            await query(`
            INSERT INTO votes (idea_id, ip_address) 
            VALUES ($1, $2)
            `, [ideaId, clientIp]);
            await query(`
                UPDATE ideas SET votes = votes + 1 WHERE id = $1
            `, [ideaId])
            await query(`COMMIT`);
            return true;
        } catch (error) {
            query('ROLLBACK');
            return false;
        }
    }

    static async votesStatus(clientIp: string) {
        const result:QueryResult<any> = await query(`
            SELECT 
            COUNT(DISTINCT idea_id) as voted_count,
            ARRAY_AGG(DISTINCT idea_id) as voted_ideas
            FROM votes 
            WHERE ip_address = $1
          `, [clientIp]);
          return result;
    }
}