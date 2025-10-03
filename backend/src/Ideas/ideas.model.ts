import { QueryResult } from "pg";
import { query } from "../config/postgres.config";
import { IdeaInterface } from "../types";

export class IdeaModel {
    static async create(title: string, description: string) {
        const result = await query(`
            INSERT INTO ideas (title,description) 
            VALUES ($1,$2)
            RETURNING id
            `, [title, description]);
        return await this.findById(result.rows[0].id);
    }

    static async findById(id: number) {
        const idea: QueryResult<IdeaInterface> = await query(`
            SELECT * FROM ideas
            WHERE id=$1
            `, [id]);
        return idea.rows[0];
    }

    static async getAll() {
        const ideas: QueryResult<IdeaInterface[]> = await query(`
            SELECT * FROM ideas
            `);
        return ideas.rows;
    }

}