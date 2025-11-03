import React, {useState} from 'react'
import styles from "./Checkout.module.css";
import CreditCardIcon from "../../assets/credit-card.svg?react";
import AddCardModal from "../AddCardModal/AddCardModal.jsx";

const Payment = ({paymentMethods, selectedCard, setSelectedCard}) => {
    const [cardModalOpen, setCardModalOpen] = useState(false);

    return (
        <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Способ оплаты</h4>
            <div className={styles.selectionList}>
                {!!paymentMethods && paymentMethods.map(card => (
                    <div key={card.id} className={`${styles.selectionItem} ${selectedCard?.id === card.id ? styles.selected : ''}`}>
                        <CreditCardIcon />
                        <div className={styles.selectionInfo}>
                            <span className={styles.selectionInfoTitle}>{card.cardType}</span>
                            <span className={styles.selectionInfoDesc}>**** **** **** {card.lastFourDigits}</span>
                        </div>
                        <input
                            type="radio"
                            name="payment"
                            value={card.id}
                            checked={selectedCard?.id === card.id}
                            onChange={() => setSelectedCard(card)}
                        />
                    </div>
                ))}
                <button onClick={() => setCardModalOpen(true)} className={styles.addButton}>+ Добавить новую карту</button>
            </div>
            <AddCardModal isOpen={cardModalOpen} onClose={() => setCardModalOpen(false)} />
        </div>
    );
};

export default Payment;