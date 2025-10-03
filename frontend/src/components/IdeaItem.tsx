import React, { useState } from 'react';
import type { Idea } from '../types';
import { voteIdea } from '../api/ideas';

interface IdeaItemProps {
    idea: Idea;
    onVoteSuccess: () => void;
}

export const IdeaItem: React.FC<IdeaItemProps> = ({ idea, onVoteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleVote = async () => {
        setLoading(true);
        setError(null);
        try {
            await voteIdea(idea.id);
            onVoteSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="idea-item">
            <h3>{idea.title}</h3>
            {idea.description && <p>{idea.description}</p>}
            <p>Votes: {idea.votesCount}</p>
            <button onClick={handleVote} disabled={idea.voted || loading}>
                {loading ? 'Voting...' : idea.voted ? 'Voted' : 'Vote'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
