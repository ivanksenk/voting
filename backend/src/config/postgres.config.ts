import { Pool, QueryResult } from "pg";
import config from "./config";

const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
})

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const initDataBase = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS ideas (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              description TEXT,
              votes INTEGER DEFAULT 0,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `);

        await query(`
            CREATE TABLE IF NOT EXISTS votes (
              id SERIAL PRIMARY KEY,
              idea_id INTEGER REFERENCES ideas(id),
              ip_address INET NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              UNIQUE(idea_id, ip_address)
            )
          `);
        console.log(`Database "${config.DB_NAME}" init`);
    } catch (error) {
        console.log('Database init error:', error);
        process.exit(1);
    }
}


