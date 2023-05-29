import styles from './score.module.css';

export const Score = (props) => {
    let {score} = props;

    return (
        <div className={styles.score}>
            <div className={styles.logo}></div>
            <div className={styles.table}>
                <span className={styles.label}>Score</span>
                <span className={styles.value}>{score}</span>
            </div>
        </div>
    );
}