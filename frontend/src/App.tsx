import React from 'react';
import { IdeaList } from './components/IdeaList';

export const App: React.FC = () => {
  return (
      <div className="container">
          <h1>LogicLike Ideas</h1>
          <IdeaList />
      </div>

  );
};
