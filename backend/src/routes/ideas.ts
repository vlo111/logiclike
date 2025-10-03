import { FastifyInstance } from 'fastify';
import { pool } from '../db';
import { getClientIp } from '../utils/getClientIp';
import { Idea, Vote } from '../types';

export async function ideasRoutes(fastify: FastifyInstance) {
    fastify.get('/ideas', async (request, reply) => {
        const ip: string = getClientIp(request);

        const ideasRes = await pool.query<Pick<Idea, 'id' | 'title' | 'description'>>(
            'SELECT id, title, description FROM idea'
        );
        const votesRes = await pool.query<Pick<Vote, 'idea_id' | 'ip'>>('SELECT idea_id, ip FROM vote');

        const votesMap: Record<number, string[]> = votesRes.rows.reduce((acc, vote) => {
            if (!acc[vote.idea_id]) acc[vote.idea_id] = [];
            acc[vote.idea_id].push(vote.ip);
            return acc;
        }, {} as Record<number, string[]>);

        const ideas: Idea[] = ideasRes.rows.map(idea => {
            const votesForIdea = votesMap[idea.id] || [];
            return {
                ...idea,
                votesCount: votesForIdea.length,
                voted: votesForIdea.includes(ip),
            };
        });

        ideas.sort((a, b) => b.votesCount - a.votesCount);

        return ideas;
    });
}
