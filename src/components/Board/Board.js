import styles from './board.module.css';
import {useEffect, useState} from "react";
import {Score} from "../Score/Score";
import {Button} from "../Button/Button";

export const Board = () => {
    const [playerTurn, setPlayerTurn] = useState(true);
    const contributors = ['lizard', 'scissors', 'spock', 'paper', 'rock'];
    const rules = {
        rock: ['lizard', 'scissors'],
        scissors: ['paper', 'lizard'],
        paper: ['rock', 'spock'],
        lizard: ['spock', 'paper'],
        spock: ['scissors', 'rock'],
    };
    const [gameScore, setGameScore] = useState(Number(localStorage.getItem('RPSLSGameScore')) || 0);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (!playerTurn) {
            setTimeout(() => {
                const opponentChoice = getComputerChoice();
                setComputerChoice(opponentChoice);
                setTimeout(() => calculateWinner(opponentChoice), 500)
            }, 500)
        }
    }, [playerTurn])

    function getPlayerChoice(e) {
        const target = e.target;
        if (target.hasAttribute('data-id')) {
            setPlayerChoice(target.getAttribute('data-id'));
            setPlayerTurn(false);
        }
    }

    function getComputerChoice() {
        const max = contributors.length - 1;
        const index = Math.floor(Math.random() * (max + 1));
        return contributors[index];
    }

    function calculateWinner(opponentChoice) {
        if (playerChoice === opponentChoice) {
            setWinner('Draw');
            return;
        }
        let loser = checkLooser(rules[playerChoice], opponentChoice);
        if (loser) {
            const score = gameScore + 1;
            setGameScore(score);
            localStorage.setItem('RPSLSGameScore', score.toString());
            setWinner('You win');
        } else {
            setWinner('You lose');
        }
    }

    function checkLooser(array, choice) {
        return array.find((value) => value === choice);
    }

    function playAgain() {
        setPlayerTurn(true);
        setPlayerChoice(null);
        setComputerChoice(null);
        setWinner(null);
    }

    return (
        <>
            <Score score={gameScore} />
            {playerTurn && (
                <div className={styles.playerBoard} onClick={getPlayerChoice}>
                    <Button name='scissors' />
                    <Button name='paper' />
                    <Button name='rock' />
                    <Button name='lizard' />
                    <Button name='spock' />
                </div>
            )}
            {!playerTurn && (
                <>
                    <div className={styles.board}>
                        <div className={styles.item}>
                            <Button name={playerChoice} type="player" winner={winner} />
                            <span className={styles.label}>You picked</span>
                        </div>
                        <div className={styles.item}>
                            {!computerChoice && <div className={styles.shadow}></div>}
                            {computerChoice && <Button name={computerChoice} type="computer" winner={winner} />}
                            <span className={styles.label}>The house picked</span>
                        </div>
                        {winner && (
                            <div className={styles.result}>
                                {winner}
                                <button className={styles.playButton} onClick={playAgain}>Play again</button>
                            </div>
                        )}
                    </div>

                </>
            )}
        </>
    );
}