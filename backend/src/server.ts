import Fastify from "fastify";
import cors from "@fastify/cors";

const app = Fastify();

await app.register(cors, {
    origin: "*",
});

app.get("/api/ideas", async () => {
    return [{ id: 1, title: "First idea from Fastify" }];
});

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
