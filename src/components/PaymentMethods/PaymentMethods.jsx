import React, {useState} from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";
import AddCardModal from "../AddCardModal/AddCardModal.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";

import PaymentMethodsItem from "./PaymentMethodsItem.jsx";
import {toast} from "react-toastify";

const PaymentMethods = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const {data} = useQuery({
        queryKey: ["payments"],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.GET_PAYMENT_METHODS,
            {
                method: 'GET',
            },
            true
        )
    })
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: (data) => apiClient(
            BASE_URL + API_ENDPOINTS.REMOVE_PAYMENT_METHOD,
            {
                method: 'POST',
                body: JSON.stringify(data),
            },
            true
        ),
        onSuccess: () => {
            queryClient.invalidateQueries("payments")
            toast("Способ оплаты успешно удален", {
                type: "success",
            })
        }
    })

    const handleDelete = (id) => {
        mutate({
            id,
        })
    }

    return (
        <div className={styles.tabContent}>
            <h2>Способы оплаты</h2>
            <p>Привяжите карту для быстрой и удобной оплаты заказов.</p>
            <div className={styles.cardList}>
                {
                    !!data && data.map((item) => (
                        <PaymentMethodsItem key={item.lastFourDigits} item={item} handleDelete={handleDelete} />
                    ))
                }
            </div>
            <button onClick={handleOpen} className={styles.addButton}>+ Добавить новую карту</button>
            <AddCardModal isOpen={isModalOpen} onClose={handleClose} />
        </div>
    );
};

export default PaymentMethods;