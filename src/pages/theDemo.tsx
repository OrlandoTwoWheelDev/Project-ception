import React, { useEffect, useState } from 'react';
import { TriviaCard } from '../types/types.js';

const fetchTrivia = async (setCards: React.Dispatch<React.SetStateAction<TriviaCard | null>>) => {
  try {
    const response = await fetch('/api/trivia/random', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trivia');
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    
    if (!data || !data.id || !data.question || !data.answer) {
      throw new Error('Invalid trivia data');
    }
    
    setCards(data);
  } catch (error) {
    console.error('Error fetching trivia:', error);
  }
};


const TheDemo: React.FC = () => {
  const [cards, setCards] = useState<TriviaCard | null>(null);

  useEffect(() => {
    fetchTrivia(setCards);
  }, []);

  const handleNextCard = () => {
    fetchTrivia(setCards);
  };

  if (!cards) {
    return <div>Loading...</div>;
  }

  return (
    <div className='the-demo'>
      <h1>Trivia Game</h1>
      <ul>
        <li key={cards.id}>
          <strong>Q: </strong>{cards.question} <br />
          <strong>A: </strong>{cards.answer} <br />
        </li>
      </ul>
      <button onClick={handleNextCard}>Next Card</button>
    </div>
  );
};

export default TheDemo;
