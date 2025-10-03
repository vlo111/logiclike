import React, { useEffect, useState } from 'react';
import type { Idea } from '../types';
import { fetchIdeas } from '../api/ideas';
import { IdeaItem } from './IdeaItem';

export const IdeaList: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadIdeas = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchIdeas();
            setIdeas(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadIdeas();
    }, []);

    if (loading) return <p>Loading ideas...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            {ideas.map(idea => (
                <IdeaItem key={idea.id} idea={idea} onVoteSuccess={loadIdeas} />
            ))}
        </div>
    );
};
