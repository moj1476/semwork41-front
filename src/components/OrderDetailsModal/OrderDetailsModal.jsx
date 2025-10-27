import React from 'react';
import styles from './OrderDetailsModal.module.css';
import Modal from "../ui/Modal/Modal.jsx";

const statuses = {
    PENDING: "В ожидании",
    PROCESSING: "В сборке",
    COMPLETED: "Выполнен",
    SHIPPED: "Отправлен",
    CANCELLED: "Отменен",
}

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
    if (!order) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Детали заказа #${order.id}`}>
            <div className={styles.orderDetails}>
                <div className={styles.summary}>
                    <div className={styles.summaryItem}>
                        <span>Статус</span>
                        <div className={styles.orderStatus} data-status={order.status.toLowerCase()}>{statuses[order.status]}</div>
                    </div>
                    <div className={styles.summaryItem}>
                        <span>Адрес доставки</span>
                        <strong>{order.deliveryAddress.fullAddress}</strong>
                    </div>
                </div>

                <h4 className={styles.itemsTitle}>Состав заказа</h4>
                <div className={styles.itemsList}>
                    {order.items.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <span className={styles.itemName}>{item.name} (x{item.quantity})</span>
                            <span className={styles.itemPrice}>{item.price * item.quantity} BYN</span>
                        </div>
                    ))}
                </div>

                <div className={styles.total}>
                    <span>Итого</span>
                    <strong>{order.totalPrice} BYN</strong>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailsModal;