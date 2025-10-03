export interface IdeaInterface {
    id: number,
    title: string,
    description: string,
    votes: number,
    created_at:number,
}

export interface VoteInterface {
    id: number,
    idea_id: number,
    ip_address: string,
    votes: number,
    created_at:number,
}