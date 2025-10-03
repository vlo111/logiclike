import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { pool } from '../db';
import { getClientIp } from '../utils/getClientIp';

interface VoteParams {
    id: string;
}

export async function votesRoutes(fastify: FastifyInstance) {
    fastify.post<{ Params: VoteParams }>('/ideas/:id/vote', async (request: FastifyRequest<{ Params: VoteParams }>, reply: FastifyReply) => {
        const ideaId = Number(request.params.id);
        if (!ideaId) return reply.status(400).send({ error: 'Invalid idea id' });

        const ip: string = getClientIp(request);

        const { rows } = await pool.query<{ count: string }>(
            'SELECT COUNT(DISTINCT idea_id) as count FROM vote WHERE ip = $1',
            [ip]
        );

        if (Number(rows[0].count) >= 10) {
            return reply.status(409).send({ error: 'IP vote limit exceeded (10 ideas)' });
        }

        try {
            await pool.query('INSERT INTO vote(idea_id, ip) VALUES($1, $2)', [ideaId, ip]);
            return reply.status(201).send({ success: true });
        } catch (err: any) {
            if (err.code === '23505') { // уникальный индекс vote(idea_id, ip)
                return reply.status(409).send({ error: 'Already voted for this idea' });
            }
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
}
