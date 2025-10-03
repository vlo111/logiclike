import { pool } from './db';

async function seed() {
    const ideas = Array.from({ length: 20 }, (_, i) => ({
        title: `Idea #${i + 1}`,
        description: `Описание идеи ${i + 1}`,
    }));

    for (const idea of ideas) {
        await pool.query('INSERT INTO idea(title, description) VALUES($1, $2)', [idea.title, idea.description]);
    }

    console.log('Seed completed');
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
