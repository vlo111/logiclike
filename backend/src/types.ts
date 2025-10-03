export interface Idea {
    id: number;
    title: string;
    description: string | null;
    votesCount: number;
    voted: boolean;
}

export interface Vote {
    id: number;
    idea_id: number;
    ip: string;
    created_at: Date;
}
