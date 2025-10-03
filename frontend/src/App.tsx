import React from 'react';
import { IdeaList } from './components/IdeaList';

export const App: React.FC = () => {
  return (
      <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
        <h1>LogicLike Ideas</h1>
        <IdeaList />
      </div>
  );
};
