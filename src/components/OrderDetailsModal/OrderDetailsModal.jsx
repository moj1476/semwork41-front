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
                        <div>Статус</div>
                        <div className={styles.orderStatus} data-status={order.status.toLowerCase()}>{statuses[order.status]}</div>
                    </div>
                    <div className={styles.summaryItem}>
                        <div>Адрес доставки</div>
                        <div className={styles.summaryItemStrong}>{order.deliveryAddress.fullAddress}</div>
                    </div>
                </div>

                <h4 className={styles.itemsTitle}>Состав заказа</h4>
                <div className={styles.itemsList}>
                    {order.items.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.itemName}>{item.name} (x{item.quantity})</div>
                            <div className={styles.itemPrice}>{item.price * item.quantity} BYN</div>
                        </div>
                    ))}
                </div>

                <div className={styles.total}>
                    <div>Итого</div>
                    <div className={styles.summaryItemStrong}>{order.totalPrice} BYN</div>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailsModal;