import React from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";

const DeliveryAddressesItem = ({item, handleDelete}) => {
    return (
        <div className={styles.card}>
            <div>
                <p className={styles.addressTitle}>{item.title}</p>
                <p className={styles.addressDetails}>{item.fullAddress}</p>
            </div>
            {
                item.default && (
                    <span className={styles.cardDefault}>Основной</span>
                )
            }
            <button onClick={() => handleDelete(item.id)} className={styles.cardAction}>Удалить</button>
        </div>
    );
};

export default DeliveryAddressesItem;