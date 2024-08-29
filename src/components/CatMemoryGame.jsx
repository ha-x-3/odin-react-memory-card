import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/catMemoryGameStyles.css';

const difficulties = {
	easy: { cardsCount: 5, winScore: 5 },
	medium: { cardsCount: 7, winScore: 7 },
	hard: { cardsCount: 12, winScore: 12 },
};

const ScoreIndicator = () => {
	return <div className='score-indicator'>+1</div>;
};

const CatMemoryGame = () => {
	const [difficulty, setDifficulty] = useState(null);
	const [cards, setCards] = useState([]);
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [selectedCards, setSelectedCards] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [gameWon, setGameWon] = useState(false);
	const [loading, setLoading] = useState(false);
	const [clickFeedback, setClickFeedback] = useState(null);
	const [showScoreIndicator, setShowScoreIndicator] = useState(false);

	useEffect(() => {
		if (difficulty) {
			fetchCats();
		}
	}, [difficulty]);

	const fetchCats = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`https://api.thecatapi.com/v1/images/search?limit=${difficulties[difficulty].cardsCount}&has_breeds=1`,
				{
					headers: {
						'x-api-key':
							'live_ObePxi8S2NAxziC3qLg4UAA5DdcMNIFDVTpWa2aKcw8LlH0AOEXSqMePgG3bcCUR',
					},
				}
			);
			const newCards = response.data.map((cat) => ({
				id: cat.id,
				name: cat.breeds[0].name,
				image: cat.url,
			}));
			setCards(newCards);
			shuffleCards(newCards);
		} catch (error) {
			console.error('Error fetching cat data:', error);
		} finally {
			setLoading(false);
		}
	};

	const shuffleCards = (cardsToShuffle = cards) => {
		setCards([...cardsToShuffle].sort(() => Math.random() - 0.5));
	};

	const handleCardClick = (cardId) => {
		if (selectedCards.includes(cardId)) {
			setClickFeedback({ id: cardId, status: 'wrong' });
			setTimeout(() => {
				setClickFeedback(null);
				setGameOver(true);
			}, 500);
		} else {
			setClickFeedback({ id: cardId, status: 'correct' });
			setShowScoreIndicator(true);

			const newScore = score + 1;
			setScore(newScore);
			setSelectedCards([...selectedCards, cardId]);
			setBestScore(Math.max(newScore, bestScore));

			if (newScore === difficulties[difficulty].winScore) {
				setTimeout(() => {
					setClickFeedback(null);
					setGameWon(true);
				}, 500);
			} else {
				setTimeout(() => {
					setClickFeedback(null);
					shuffleCards();
				}, 500);
			}

			setTimeout(() => setShowScoreIndicator(false), 1000);
		}
	};

	const resetGame = () => {
		setScore(0);
		setSelectedCards([]);
		setGameOver(false);
		setGameWon(false);
		fetchCats();
	};

	const startGame = (selectedDifficulty) => {
		setDifficulty(selectedDifficulty);
	};

	if (!difficulty) {
		return (
			<div>
				<h1>Cat Memory Game</h1>
				<p>Choose difficulty:</p>
				{Object.keys(difficulties).map((diff) => (
					<button
						key={diff}
						onClick={() => startGame(diff)}
					>
						{diff.charAt(0).toUpperCase() + diff.slice(1)}
					</button>
				))}
			</div>
		);
	}

	return (
		<div className='gameboard'>
			<h1>Cat Memory Game</h1>
			<div className='game-info'>
				<p>Difficulty: {difficulty}</p>
				<p>Score: {score}</p>
				<p>Best Score: {bestScore}</p>
				{showScoreIndicator && <ScoreIndicator />}
			</div>
			{gameOver && (
				<div>
					<p>Game Over! You clicked the same cat twice.</p>
					<button onClick={resetGame}>Play Again</button>
				</div>
			)}
			{gameWon && (
				<div>
					<p>Congratulations! You won!</p>
					<button onClick={() => setDifficulty(null)}>
						Choose New Difficulty
					</button>
					<button onClick={resetGame}>Play Again</button>
				</div>
			)}
			{!gameOver && !gameWon && !loading && (
				<div className='card-container'>
					{cards.map((card) => (
						<div
							key={card.id}
							onClick={() => handleCardClick(card.id)}
							className={`card ${
								clickFeedback && clickFeedback.id === card.id
									? clickFeedback.status
									: ''
							} gameboard`}
						>
							<img
								src={card.image}
								alt={card.name}
								style={{
									width: '150px',
									height: '150px',
									objectFit: 'cover',
								}}
							/>
							<p>{card.name}</p>
						</div>
					))}
				</div>
			)}
			{loading && <p>Loading new cats...</p>}
		</div>
	);
};

export default CatMemoryGame;
