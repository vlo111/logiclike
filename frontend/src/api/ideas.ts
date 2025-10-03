import type { Idea } from '../types.ts';

const API_BASE = 'http://localhost:3000/api';

export async function fetchIdeas(): Promise<Idea[]> {
    const res = await fetch(`${API_BASE}/ideas`);
    if (!res.ok) throw new Error('Failed to fetch ideas');
    return res.json();
}

export async function voteIdea(id: number): Promise<{ success?: boolean; error?: string }> {
    const res = await fetch(`${API_BASE}/ideas/${id}/vote`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to vote');
    return data;
}
