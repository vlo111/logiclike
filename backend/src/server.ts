import Fastify from "fastify";
import cors from "@fastify/cors";
import {ideasRoutes} from "./routes/ideas";
import {votesRoutes} from "./routes/votes";

const app = Fastify();

await app.register(cors, {
    origin: "*",
});

await app.register(ideasRoutes, { prefix: "/api" });
await app.register(votesRoutes, { prefix: "/api" });

const PORT = 3000;

async function start() {
    try {
        await app.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`🚀 Fastify server running at http://localhost:${PORT}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();
