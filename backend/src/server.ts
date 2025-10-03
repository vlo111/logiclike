import Fastify from 'fastify';
import { ideasRoutes } from './routes/ideas';
import { votesRoutes } from './routes/votes';

const fastify = Fastify({ logger: true });

fastify.register(ideasRoutes, { prefix: '/api' });
fastify.register(votesRoutes, { prefix: '/api' });

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server running on http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
