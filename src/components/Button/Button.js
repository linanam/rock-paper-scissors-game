import styles from "./button.module.css";

export const Button = (props) => {
    const {name, type, winner} = props;
    let additionalClass = '';
    if (winner && winner.search('draw') < 0) {
        const isWin = winner.search('win');
        if (type === 'player' && isWin > 0) {
            additionalClass = 'winner';
        } else if (type === 'computer' && isWin < 0) {
            additionalClass = 'winner';
        }
    }

    return (
        <button className={`${styles.button} ${styles[name]} ${additionalClass}`} data-id={name}></button>
    );
}