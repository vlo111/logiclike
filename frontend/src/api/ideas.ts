import type { Idea } from '../types';

const API_BASE = 'http://localhost:3000/api';

export async function fetchIdeas(): Promise<Idea[]> {
    const res = await fetch(`${API_BASE}/ideas`);
    if (!res.ok) throw new Error('Failed to fetch ideas');
    return res.json();
}

export async function voteIdea(id: number): Promise<Idea> {
    const res = await fetch(`${API_BASE}/ideas/${id}/vote`, {
        method: 'POST'
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to vote');
    }
    return res.json();
}
