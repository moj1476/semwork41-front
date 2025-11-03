import React from 'react'
import styles from './Checkout.module.css';

const TotalPrice = ({totalPrice, handleConfirmOrder}) => {


    return (
        <div className={styles.footer}>
            <div className={styles.total}>
                <span>Итоговая стоимость:</span>
                <span className={styles.strongTotal}>{totalPrice()} BYN</span>
            </div>
            <button onClick={handleConfirmOrder} className={styles.confirmButton}>
                Подтвердить заказ
            </button>
        </div>
    );
};

export default TotalPrice;