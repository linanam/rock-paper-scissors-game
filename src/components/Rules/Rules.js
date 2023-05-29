import styles from './rules.module.css';
import {useState} from "react";
import ruleImg from './images/image-rules-bonus.svg';

export const Rules = () => {
    const [show, setShow] = useState(false);

    function openModal() {
        setShow(true);
    }

    function closeModal() {
        setShow(false);
    }

    return (
        <div className={styles.rulesContainer}>
            <button className={styles.button} onClick={openModal}>Rules</button>
            {show &&
                <div className={styles.modal}>
                    <h3>Rules</h3>
                    <img src={ruleImg} alt="rules" />
                    <button className={styles.closeButton} onClick={closeModal}></button>
                </div>
            }
        </div>
    );
}