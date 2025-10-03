import { FastifyRequest } from 'fastify';

export function getClientIp<T = any>(req: FastifyRequest<T>): string {
    const xff = req.headers['x-forwarded-for'] as string | undefined;
    if (xff) {
        const parts = xff.split(',').map(s => s.trim()).filter(Boolean);
        if (parts.length > 0) return parts[0];
    }

    const xr = req.headers['x-real-ip'] as string | undefined;
    if (xr) return xr;

    return req.socket?.remoteAddress || 'unknown';
}
