import React from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";
import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal.jsx";

const statuses = {
    PENDING: "В ожидании",
    PROCESSING: "В сборке",
    COMPLETED: "Выполнен",
    SHIPPED: "Отправлен",
    CANCELLED: "Отменен",
}

const OrderItem = ({item}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={styles.orderItem}>
            <div>
                <span className={styles.orderId}>Заказ #{item.id}</span>
            </div>
            <div className={styles.orderStatus} data-status={item.status.toLowerCase()}>{statuses[item.status]}</div>
            <div className={styles.orderTotal}>{
                item.totalPrice
            } BYN</div>
            <a onClick={() => setIsOpen(true)} href="#" className={styles.orderDetails}>Детали</a>
            <OrderDetailsModal order={item} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default OrderItem;