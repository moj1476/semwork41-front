import React from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";
import OrderItem from "./OrderItem.jsx";
import {useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";

const OrderHistory = () => {

    const {data} = useQuery({
        queryKey: ["orders"],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.GET_ALL_ORDERS,
            {
                method: "GET",
            },
            true
        )
    })

    return (
        <div className={styles.tabContent}>
            <h2>История заказов</h2>
            <p>Здесь отображаются все ваши прошлые и текущие заказы.</p>
            <div className={styles.orderList}>
                {
                    !!data && data?.map((item) => (
                        <OrderItem item={item} key={item.id} />
                    ))
                }
            </div>
        </div>
    );
};

export default OrderHistory;