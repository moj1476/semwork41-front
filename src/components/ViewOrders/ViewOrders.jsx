import styles from "../../pages/AdminPage/AdminPage.module.css";
import React from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import OrderItem from "./OrderItem.jsx";
import {toast} from "react-toastify";

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
            onSuccess: () => {
                queryClient.invalidateQueries("orders")
                toast("Статус заказа успешно обновлен", {
                    type: "success",
                })
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
                {!!data && data.map(o => <OrderItem key={o.id} o={o} handleStatusChange={handleStatusChange} />)}
                </tbody>
            </table>
        </div>
    );
}

export default ViewOrders;