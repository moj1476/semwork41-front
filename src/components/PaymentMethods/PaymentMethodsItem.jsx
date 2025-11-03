import React from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";

const PaymentMethodsItem = ({item, handleDelete}) => {
    return (
        <div className={styles.card}>
            <span>{item.cardType} **** **** **** {item.lastFourDigits}</span>
            {
                item.default && (
                    <span className={styles.cardDefault}>Основная</span>
                )
            }
            <button onClick={() => handleDelete(item.id)} className={styles.cardAction}>Удалить</button>
        </div>
    );
};

export default PaymentMethodsItem;