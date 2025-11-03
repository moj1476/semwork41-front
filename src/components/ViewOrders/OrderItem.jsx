import React from 'react'
import styles from "../../pages/AdminPage/AdminPage.module.css";

const OrderItem = ({o, handleStatusChange}) => {
    return (
        <tr key={o.id}>
            <td>#{o.id}</td>
            <td>{o.deliveryAddress.fullAddress}</td>
            <td>{o.totalPrice} BYN</td>
            <td>
                <select
                    className={`${styles.statusSelect} ${styles[o.status]}`}
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                >
                    <option value="PENDING">В ожидании</option>
                    <option value="PROCESSING">В сборке</option>
                    <option value="SHIPPED">Отправлен</option>
                    <option value="COMPLETED">Выполнен</option>
                    <option value="CANCELLED">Отменен</option>
                </select>
            </td>
        </tr>
    );
};

export default OrderItem;