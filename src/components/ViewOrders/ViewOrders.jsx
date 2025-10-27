import styles from "../../pages/AdminPage/AdminPage.module.css";
import React from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";

const ViewOrders = () => {
    const queryClient = useQueryClient();
    const {mutate} = useMutation(
        {
            mutationFn: (vars) => apiClient(
                BASE_URL + API_ENDPOINTS.ADMIN_CHANGE_ORDER_STATUS + `/${vars.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        orderStatus: vars.orderStatus,
                    }),
                },
                true
            ),
            onSettled: () => {
                queryClient.invalidateQueries("orders")
            }
        }
    );


    const handleStatusChange = (orderId, newStatus) => {
        mutate({
            orderStatus: newStatus,
            id: orderId,
        })
    };

    const {data} = useQuery({
        queryKey: ['orders'],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.ADMIN_GET_ALL_ORDERS,
            {
                method: 'GET',
            },
            true
        )
    })

    return (
        <div className={styles.tabContent}>
            <div className={styles.tabHeader}><h2>Активные и завершенные заказы</h2></div>
            <table className={styles.table}>
                <thead><tr><th>ID Заказа</th><th>Адрес</th><th>Сумма</th><th>Статус</th></tr></thead>
                <tbody>
                {!!data && data.map(o => {
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
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ViewOrders;