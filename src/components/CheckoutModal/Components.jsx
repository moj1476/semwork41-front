import React from 'react'
import styles from './Checkout.module.css';

const Components = ({buildData}) => {
    return (
        <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Ваша сборка</h4>
            <div className={styles.itemsList}>
                {Object.entries(buildData).map(([, item]) => (
                    <div key={item.name} className={styles.item}>
                        <span>{item.name}</span>
                        <span className={styles.itemPrice}>{item.price} BYN</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Components;