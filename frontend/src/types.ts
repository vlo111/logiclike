export interface Idea {
    id: number;
    title: string;
    description: string | null;
    votesCount: number;
    voted: boolean;
}
