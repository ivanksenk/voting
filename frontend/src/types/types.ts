export interface Idea {
    id: number;
    title: string;
    description: string;
    votes: number;
    created_at: string;
    vote_count: number;
  }
  
  export interface VotingStatus {
    votedCount: number;
    votedIdeas: number[];
    votesRemaining: number;
  }